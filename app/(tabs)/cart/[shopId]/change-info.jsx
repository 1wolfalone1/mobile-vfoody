import * as Location from 'expo-location';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, Divider, HelperText, IconButton, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Colors } from '../../../../constant';
import globalSlice from '../../../../redux/slice/globalSlice';
import orderSlice, { orderSelector } from '../../../../redux/slice/orderSlice';
import { dataShopDetailsSelector } from '../../../../redux/slice/shopDetailsSlice';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  shadow: {
    shadowOffset: { width: 5, height: 8 },
    shadowColor: Colors.shadow[400],

    shadowOpacity: 0.7,
    elevation: 10,
  },
});
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/((^(\\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/, 'Số điện thoại không hợp lệ!')
    .required('Vui lòng nhập số điện thoại'),
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  building: yup.string().required('Vui lòng nhập địa chỉ'),
});
const ChangeInfoPage = () => {
  const { orderInfo } = useSelector(orderSelector);
  const [address, setAddress] = useState({});
  const apiKey = process.env.EXPO_PUBLIC_SERVICE_API;
  const refSuggest = useRef();
  const refMap = useRef();
  const { info: shopInfo } = useSelector(dataShopDetailsSelector);
  const refMarker = useRef();
  const dispatch = useDispatch();
  const [destination, setDestination] = useState({
    latitude: 10.8387911,
    longitude: 106.8347649,
    name: 'Vinhome Grand Park',
  });
  const [origin, setOrigin] = useState([
    {
      latitude: 10.8387911,
      longitude: 106.8347649,
      name: 'Vinhome Grand Park',
    },
  ]);
  useEffect(() => {
    console.log(shopInfo.building, ' building ne');
    Location.requestForegroundPermissionsAsync();
    if (shopInfo && shopInfo.building) {
      setDestination({
        latitude: shopInfo.building.latitude,
        longitude: shopInfo.building.longitude,
        name: shopInfo.building.name,
      });
    }
    if (orderInfo.building) {
      setOrigin([
        {
          address: orderInfo.building.address,
          latitude: orderInfo.building.latitude,
          longitude: orderInfo.building.longitude,
        },
      ]);
    }
    if (refMarker?.current) {
      refMarker.current.showCallout();
    }
  }, []);
  useEffect(() => {
    if (refSuggest) {
      if (refSuggest.current) {
        console.log(origin[0], ' origina');
        refSuggest?.current?.setAddressText(origin[0].address);
      }
    }
  }, [origin]);
  const handleUpdateOrderInfo = (values) => {
    if (!(origin[0] && origin[0].address)) {
      dispatch(
        globalSlice.actions.customSnackBar({
          style: {
            color: 'white',
            backgroundColor: Colors.glass.red,
            pos: {
              top: 40,
            },
            actionColor: 'yellow',
          },
        }),
      );
      dispatch(
        globalSlice.actions.openSnackBar({
          message: 'Địa chỉ không thể bỏ trống!!!',
        }),
      );
    } else {
      dispatch(
        orderSlice.actions.changeOrderInfo({
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          building: {
            address: origin[0].address,
            longitude: origin[0].longitude,
            latitude: origin[0].latitude,
          },
        }),
      );
      dispatch(
        globalSlice.actions.customSnackBar({
          style: {
            color: 'white',
            backgroundColor: Colors.glass.green,
            pos: {
              top: 40,
            },
            actionColor: 'yellow',
          },
        }),
      );
      dispatch(
        globalSlice.actions.openSnackBar({
          message: 'Thay đổi địa chỉ đơn hàng thành công <3',
        }),
      );
      router.back();
    }
  };
  return (
    <ScrollView
      horizontal={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'column',
      }}
    >
      <View className="py-2 items-center">
        <Text className="font-hnow65medium text-lg">Thay đổi thông tin giao hàng</Text>
        <Divider className="w-full h-[1] my-4" />
      </View>
      <View
        className="flex-1"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <Formik
          initialValues={{
            phoneNumber: orderInfo.phoneNumber,
            fullName: orderInfo.fullName,
            building: orderInfo.building.address,
          }}
          onSubmit={(values) => {
            console.log('----------------------submit--------------------');
            handleUpdateOrderInfo(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View className="flex-row gap-2 mb-10">
                <View className="flex-1">
                  <TextInput
                    mode="outlined"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    label={'Họ và tên'}
                    value={values.fullName}
                  />
                  <HelperText type="error" visible={touched.fullName && errors.fullName}>
                    {errors.fullName}
                  </HelperText>
                </View>
                <View className="flex-1">
                  <TextInput
                    mode="outlined"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    label={'Số điện thoại'}
                    value={values.phoneNumber}
                  />
                  <HelperText type="error" visible={touched.phoneNumber && errors.phoneNumber}>
                    {errors.phoneNumber}
                  </HelperText>
                </View>
              </View>
              <View
                className=""
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderRadius: 24,
                  overflow: 'hidden',
                }}
              >
                <GooglePlacesAutocomplete
                  placeholder="Nhập địa chỉ nè"
                  ref={refSuggest}
                  styles={{
                    container: {
                      flex: 1,
                      zIndex: 100,
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      right: 8,
                      borderRadius: 16,
                      ...styles.shadow,
                    },
                    textInput: {
                      textAlign: 'left',
                      fontSize: 16,
                    },
                    listView: {
                      zIndex: 1000,
                    },
                  }}
                  renderRightButton={() => {
                    return (
                      <IconButton
                        icon={'close'}
                        onPress={() => {
                          refSuggest.current.clear();
                          refSuggest.current.blur();
                        }}
                        iconColor="red"
                      />
                    );
                  }}
                  nearbyPlacesAPI="GoogleReverseGeocoding"
                  isRowScrollable={true}
                  debounce={100}
                  fetchDetails
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    const location = {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      address: details.name,
                    };
                    console.log(location, 'name ne');
                    setOrigin([location]);
                    refMap.current.animateToRegion(location);
                  }}
                  query={{
                    key: apiKey,
                    language: 'vn',
                  }}
                  keyboardShouldPersistTaps="handled"
                />
                <MapView
                  onMapReady={() => {
                    PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    ).then((granted) => {});
                  }}
                  showsCompass={true}
                  followsUserLocation
                  style={styles.map}
                  initialRegion={{
                    latitude: 14.0583,
                    longitude: 108.2772,
                    latitudeDelta: 0.922,
                    longitudeDelta: 0.121,
                  }}
                  showsBuildings
                  showsScale
                  loadingEnabled={true}
                  region={{
                    ...origin[0],
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.009421,
                  }}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  ref={refMap}
                >
                  {
                    <MapViewDirections
                      apikey={apiKey}
                      origin={origin[0]}
                      destination={destination}
                    />
                  }
                  {origin.map((marker) => {
                    return (
                      <Marker
                        key={uuid.v4()}
                        coordinate={marker}
                        ref={refMarker}
                        style={{
                          backgroundColor: 'blue',
                        }}
                        tracksViewChanges={true}
                      >
                        <Callout style={{ flex: 1, position: 'relative' }} tooltip>
                          <View className="rounded-xl p-2 bg-white" style={{}}>
                            <Text numberOfLines={5} className="font-hnow63book">
                              {marker.address}
                            </Text>
                          </View>
                        </Callout>
                      </Marker>
                    );
                  })}
                  <Marker key={uuid.v4()} coordinate={destination} tracksViewChanges={true}>
                    <Callout style={{ flex: 1, position: 'relative' }} tooltip>
                      <View className="rounded-xl p-2 bg-white" style={{}}>
                        <Text numberOfLines={5} className="font-hnow63book">
                          {destination.name} - Địa chỉ của shop
                        </Text>
                      </View>
                    </Callout>
                  </Marker>
                </MapView>
              </View>
              <View className="flex-row justify-end gap-2 pt-5">
                <Button
                  mode="outlined"
                  labelStyle={{
                    fontSize: 18,
                    color: Colors.primaryBackgroundColor,
                  }}
                  onPress={() => router.back()}
                >
                  Hủy
                </Button>
                <Button
                  mode="elevated"
                  labelStyle={{
                    fontSize: 18,
                    color: 'black',
                  }}
                  onPress={handleSubmit}
                >
                  Lưu
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ChangeInfoPage;
