import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button, HelperText, Modal, Portal, TextInput, Tooltip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import api from '../../api/api';
import { Colors } from '../../constant';
import globalSlice, { globalSelector } from '../../redux/slice/globalSlice';
import { loadInfo, userInfoSliceSelector } from '../../redux/slice/userSlice';
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/((^(\\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/, 'Số điện thoại không hợp lệ!')
    .required('Vui lòng nhập số điện thoại'),
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
const UserFormInfo = () => {
  const [address, setAddress] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
  });
  const info = useSelector(userInfoSliceSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const { map } = useSelector(globalSelector);
  const handleUpdateUserprofile = async (value) => {
    try {
      const res = await api.put('/api/v1/customer/profile/' + info.id, {
        phoneNumber: value.phoneNumber,
        fullName: value.fullName,
        address: address.name,
        latitude: address.latitude,
        longitude: address.longitude,
      });
      const data = await res.data;
      console.log(data);
      if (data.isSuccess) {
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
        dispatch(globalSlice.actions.openSnackBar({ message: 'Thay đổi thông tin thành công <3' }));
        dispatch(loadInfo());
      } else {
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
            message: 'Không thể thay đổi thông tin! Làm ơn thử lại sau :_)',
          }),
        );
      }
    } catch (e) {
      console.log(e);
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
          message: 'Có gì lỗi rồi, thử lại sau nhé :(',
        }),
      );
    }
  };
  const handleOpenMap = () => {
    router.push('/map');
  };
  console.log(address);
  useEffect(() => {
    console.log(map, ' map ne');
    if (map.isChange) {
      setAddress(map.origin);
    } else {
      if (info.building) {
        setAddress({
          latitude: info.building.latitude,
          longitude: info.building.longitude,
          name: info.building.address,
        });
        dispatch(
          globalSlice.actions.changeMapState({
            name: info.building.address,
            longitude: info.building.longitude,
            latitude: info.building.latitude,
          }),
        );
      }
    }
  }, [map, info]);
  useEffect(() => {
    return () => {
      dispatch(globalSlice.actions.resetMapsState());
    };
  }, []);
  const hideModal = () => {
    setVisible(false);
  };
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <MapView style={styles.map} />
        </Modal>
      </Portal>
      <Formik
        initialValues={{
          phoneNumber: info.phoneNumber,
          fullName: info.fullName,
          building: address,
        }}
        onSubmit={(values) => {
          console.log('----------------------submit--------------------');
          handleUpdateUserprofile(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="gap-4 px-8 mt-8">
            <View>
              <TextInput value={info.email} editable={false} mode="outlined" label={'Email'} />
              <HelperText type="error" visible={false}>
                Email address is invalid!
              </HelperText>
            </View>
            <View>
              <TextInput
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                mode="outlined"
                label="Họ và tên"
              />
              <HelperText type="error" visible={touched.fullName && errors.fullName}>
                {errors.fullName}
              </HelperText>
            </View>
            <View>
              <TextInput
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                mode="outlined"
                label="Số điện thoại"
                outlineStyle={{
                  color: Colors.primaryBackgroundColor,
                }}
              />
              <HelperText type="error" visible={touched.phoneNumber && errors.phoneNumber}>
                {errors.phoneNumber}
              </HelperText>
            </View>
            <View>
              <Tooltip title={address?.name}>
                <View className="flex-row items-end justify-center gap-1">
                  <TextInput
                    value={address?.name}
                    onChangeText={handleChange('building')}
                    onBlur={handleBlur('building')}
                    mode="outlined"
                    label="Địa chỉ"
                    style={{
                      flex: 1,
                    }}
                    editable={false}
                    contentStyle={{
                      color: '#000000',
                    }}
                    className="flex-1 m-0"
                  />
                  <Button
                    icon="map-marker-plus"
                    onPress={handleOpenMap}
                    uppercase
                    className="rounded-xl p-1"
                    mode="elevated"
                    buttonColor={'blue'}
                    textColor="white"
                  >
                    change
                  </Button>
                </View>
              </Tooltip>
              <HelperText type="error" visible={touched.building && errors.building}>
                {errors.building}
              </HelperText>
            </View>
            <View className="justify-center items-center pb-10">
              <Button
                buttonColor={Colors.primaryBackgroundColor}
                textColor={Colors.commonBtnText}
                mode="elevated"
                style={{ width: '80%' }}
                theme={{ roundness: 4 }}
                contentStyle={{
                  paddingVertical: 8,
                }}
                labelStyle={{
                  fontFamily: 'HeadingNow-64Regular',
                  fontSize: 18,
                  lineHeight: 20,
                }}
                onPress={handleSubmit}
              >
                Cập nhật
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default UserFormInfo;
