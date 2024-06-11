import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button, HelperText, Modal, Portal, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Colors } from '../../constant';
import { userInfoSliceSelector } from '../../redux/slice/userSlice';
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

  const info = useSelector(userInfoSliceSelector);
  const [visible, setVisible] = React.useState(false);
  const handleUpdateUserprofile = async (data) => {};
  const handleOpenMap = () => {
    setVisible(true)
  };
  const hideModal = () => {
    setVisible(false)
  };
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{
          backgroundColor: 'white',
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 20,
        }}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <MapView style={styles.map} />
        </Modal>
      </Portal>
      <Formik
        initialValues={{
          phoneNumber: info.phoneNumber,
          fullName: info.fullName,
          building: info.building,
        }}
        onSubmit={(values) => {
          handleUpdateUserprofile(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="gap-4 px-8 mt-8">
            <View>
              <TextInput
                value={info.email}
                disabled
                mode="outlined"
                label={'Email'}
                contentStyle={{
                  color: 'grey',
                }}
              />
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
              <View className="flex-row items-center justify-center gap-1">
                <TextInput
                  value={values.building}
                  onChangeText={handleChange('building')}
                  onBlur={handleBlur('building')}
                  mode="outlined"
                  label="Địa chỉ"
                  className="flex-1 m-0"
                  outlineStyle={{
                    color: Colors.primaryBackgroundColor,
                  }}
                />
                <Button
                  icon="map-marker-plus"
                  onPress={handleOpenMap}
                  uppercase
                  className="rounded-xl"
                  mode="elevated"
                  buttonColor={Colors.primaryBackgroundColor}
                  textColor="white"
                >
                  change
                </Button>
              </View>
              <HelperText type="error" visible={touched.building && errors.building}>
                {errors.building}
              </HelperText>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

export default UserFormInfo;
