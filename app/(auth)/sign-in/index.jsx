import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { Colors } from '../../../constant';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ!')
    .max(50, 'Email tối đa 50 ký tự!')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(25, 'Mật khẩu chỉ có tối đa 25 ký tự')
    .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một ký tự số (0-9)')
    .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái in thường (a-z)')
    .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái in hoa (A-Z)')
    .matches(
      /[^\w]/,
      'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (`, ~, !, @, #, $, %, ^, &, *, ?)',
    )
    .required('Vui lòng nhập mật khẩu'),
});

const index = () => {
  const [isShowPassword, setIsShownPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        // Handle login logic here
        router.push('/home');
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="flex gap-4 mt-5 items-center">
          <View className="w-full flex-1 items-center">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              onBlur={handleBlur('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Nhập email của bạn"
              onSubmitEditing={Keyboard.dismiss}
            />
            <View className="w-[80%]">
              <HelperText type="error" visible={touched.email && errors.email}>
                {errors.email}{' '}
              </HelperText>
            </View>
          </View>
          <View className="w-full flex-1 items-center">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={!isShowPassword}
              right={
                !isShowPassword ? (
                  <TextInput.Icon icon="eye-off" onPress={() => setIsShownPassword(true)} />
                ) : (
                  <TextInput.Icon icon="eye" onPress={() => setIsShownPassword(false)} />
                )
              }
              placeholder="Nhập mật khẩu của bạn"
            />
            <View className="w-[80%]">
              <HelperText type="error" visible={touched.password && errors.password}>
                {errors.password}
              </HelperText>
            </View>
          </View>
          <Button
            textColor={Colors.primaryBackgroundColor}
            mode="text"
            theme={{ roundness: 4 }}
            contentStyle={{
              paddingVertical: 8,
            }}
            labelStyle={{
              fontFamily: 'HeadingNow-64Regular',
              fontWeight: 700,
              fontSize: 16,
            }}
            onPress={() => {
              router.push('verify/forgot-password');
            }}
          >
            Quên Mật Khẩu?
          </Button>

          <Button
            buttonColor={Colors.primaryBackgroundColor}
            textColor={Colors.commonBtnText}
            mode="elevated"
            style={{ width: '80%' }}
            theme={{ roundness: 4 }}
            contentStyle={{
              paddingVertical: 4,
            }}
            labelStyle={{
              fontFamily: 'HeadingNow-64Regular',
              fontSize: 16,
              lineHeight: 18,
            }}
            onPress={handleSubmit}
          >
            Đăng nhập
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default index;
