import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { ConciergeBell, MapPinned, PackageCheck, Timer, Truck } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Divider } from 'react-native-paper';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import { Colors } from '../../../../constant';
import images from '../../../../constant/images';
import { userInfoSliceSelector } from '../../../../redux/slice/userSlice';
import { formatNumberVND } from '../../../../utils/MyUtils';

const OrderTracking = () => {
  const { width, height } = Dimensions.get('window');
  const widthItem = (width * 90) / 100;
  const heightItem = (height * 20) / 100;
  const widthImageIllustration = (width * 30) / 100;
  const [openInfoOrder, setOpenInfoOrder] = useState(false);
  console.log(openInfoOrder, ' open');
  const params = useLocalSearchParams();
  const refMap = useRef();
  const [heightMap, setHeightMap] = useState(0);
  const layoutRef = useRef();
  const translateY = useSharedValue(0);
  const bottomSheetRef = useRef(null);
  const info = useSelector(userInfoSliceSelector);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const [origin, setOrigin] = useState([
    {
      latitude: 10.8387911,
      longitude: 106.8347649,
      name: 'Vinhome Grand Park',
    },
  ]);
  console.log(heightMap, ' height map');
  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);
  useEffect(() => {
    if (openInfoOrder) {
      translateY.value = withTiming(100);
    } else {
      translateY.value = withTiming(heightMap - 50);
    }
  }, [openInfoOrder]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      minHeight: translateY.value,
    };
  });
  console.log(params);
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      className=""
      ref={layoutRef}
      onLayout={(event) => {
        setHeightMap(event.nativeEvent.layout.height); // Store parent height on layout
      }}
    >
      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
            (granted) => {},
          );
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
          //   <MapViewDirections
          //   apikey={apiKey}
          //   origin={origin}
          //   destination={{
          //     latitude: 14.058213,
          //     longitude: 108.27734,
          //   }}
          // />
        }
        {origin.map((marker) => {
          return (
            <Marker key={uuid.v4()} coordinate={marker} tracksViewChanges={true}>
              <Callout style={{ flex: 1, position: 'relative' }} tooltip>
                <View className="rounded-xl p-2 bg-white" style={{}}>
                  <Text numberOfLines={5} className="font-hnow63book">
                    {marker.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View className=" absolute bottom-0 right-0 left-0 items-center">
        {
          // <Animated.View
          //   style={[
          //     {
          //       width: width,
          //       backgroundColor: 'white',
          //       ...styles.shadow,
          //       borderTopLeftRadius: 16,
          //       borderTopRightRadius: 16,
          //     },
          //     animatedStyle,
          //   ]}
          // >
          //   <TouchableRipple onPress={() => setOpenInfoOrder(state => !openInfoOrder)}>
          //     <View
          //       className="justify-center items-center"
          //       style={{
          //         height: 50,
          //       }}
          //     >
          //       <Equal color={Colors.greyText} size={25} />
          //     </View>
          //   </TouchableRipple>
          //
          //   <Divider className="w-full" />
          //
          //   <View style={{ height: 200 }} />
          // </Animated.View>
        }
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        
        style={{
          backgroundColor: 'white',
          ...styles.shadow,
          borderRadius: 16,
        }}
        onChange={handleSheetChanges}
        snapPoints={[300, heightMap != 0 ? heightMap : 100]}
      >
        <BottomSheetView 
         
        style={{
          flex: 1
        }}>
          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={2}
            labels={labels}
            renderStepIndicator={renderStepIndicator}
          />
          <View className="flex-row px-10 justify-between my-4 items-center">
            <View className="flex-row gap-2 items-center">
              <Text className="text-sm">Tổng cộng: </Text>
              <Text className="text-primary text-lg">{formatNumberVND(40000)}</Text>
            </View>
            <View className="flex-row">
              <Text className="font-hnow63book mr-4 text-green-800">Mã đơn hàng: {params.id}</Text>
              <Text className="font-hnow63book text-green-800">#213</Text>
            </View>
          </View>
          <View className="px-10 flex-row justify-between items-center">
            <Text className="font-hnow64regular text-blue-500 text-xs">
              Đặt lúc: 21/05/2024 14:21
            </Text>
            <Text className="font-hnow64regular text-green-800 text-xs">
              Dự kiến giao: 21/05/2024 15:22
            </Text>
          </View>
          <View
            className="flex-row"
            style={{
              height: widthImageIllustration,
            }}
          >
            <Image
              source={images.FoodOrder}
              style={{ height: widthImageIllustration, width: widthImageIllustration }}
            />
            <View className="justify-between py-4 flex-1 pr-10 ">
              <View className="flex-row items-center gap-2">
                <Image
                  source={images.PromotionShopLogo}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 25,
                    overflow: 'hidden',
                  }}
                />
                <Text className="font-bold text-base">Tiệm trà tháng năm</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text numberOfLines={1} className="flex-wrap flex-1 text-sm text-gray-600">
                  {info.fullName}
                </Text>
                <Divider className="h-full" style={{ width: 2 }} />
                <Text
                  className="flex-wrap flex-1 text-sm text-gray-600 "
                  style={{
                    textAlign: 'right',
                  }}
                >
                  {info.phoneNumber}
                </Text>
              </View>
              <View className=" flex-row  items-end gap-2">
                <MapPinned color={'grey'} size={20} />
                <Text numberOfLines={2} className="flex-wrap flex-1 text-sm text-gray-600">
                  {info.building.address}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView 
          showsVerticalScrollIndicator={true}
          className=" bg-red-200" contentContainerStyle={{
            flexGrow: 1
          }}>
            <View className="h-1000" style={{
              height: 10000
            }}/>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default OrderTracking;
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
    shadowColor: 'black',

    shadowOpacity: 0.9,
    elevation: 20,
  },
});
const labels = ['Chờ xác nhận','Shop đang làm', 'Đang giao', 'Hoàn thành'];
const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.blue[100],
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.blue[100],
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.blue[100],
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.blue[100],
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 30,
  currentStepIndicatorLabelFontSize: 35,
  stepIndicatorLabelCurrentColor: Colors.blue[100],
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: Colors.blue[100],
};
const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    color: stepStatus === 'finished' ? '#ffffff' : Colors.blue[100],
    size: 24,
  };

  return iconConfig;
};

const renderStepIndicator = (params) => {
  const { position, stepStatus } = params;
  if (position == 0) {
    return <Timer {...getStepIndicatorIconConfig(params)} />;
  } else if (position == 1) {
    return <ConciergeBell {...getStepIndicatorIconConfig(params)} />;
  } else if (position == 2) {
    return <Truck {...getStepIndicatorIconConfig(params)} />;
  } else if (position == 3) {
    return <PackageCheck {...getStepIndicatorIconConfig(params)} />;
  }
};
