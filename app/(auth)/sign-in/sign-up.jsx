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
  phoneNumber: yup
    .string()
    .matches(/^(0)[0-9]{7,10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Vui lòng nhập lại mật khẩu'),
});
const SignUpLayout = () => {
  const [isShowPassword, setIsShownPassword] = useState(false);
  const [isShowConfirmPassword, setIsShownConfirmPassword] = useState(false);
  return (
    <Formik
      initialValues={{
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values) => {
        // Handle signup logic here
        console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="flex gap-1 mt-5 items-center">
          <View className="w-full flex-1 items-center">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              dense
              onBlur={handleBlur('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              placeholder="Nhập email của bạn"
              onSubmitEditing={Keyboard.dismiss}
            />
            <View className="w-[80%]">
              <HelperText type="error" visible={touched.email && errors.email}>
                {errors.email}
              </HelperText>
            </View>
          </View>
          <View className="w-full flex-1 items-center">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              dense
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại của bạn"
              onSubmitEditing={Keyboard.dismiss}
            />
            <View className="w-[80%]">
              <HelperText type="error" visible={touched.phoneNumber && errors.phoneNumber}>
                {errors.phoneNumber}{' '}
              </HelperText>
            </View>
          </View>
          <View className="w-full flex-1 items-center">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              dense
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
          <View className="w-full flex-1 items-center mb-5">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              dense
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={!isShowConfirmPassword}
              right={
                !isShowConfirmPassword ? (
                  <TextInput.Icon icon="eye-off" onPress={() => setIsShownConfirmPassword(true)} />
                ) : (
                  <TextInput.Icon icon="eye" onPress={() => setIsShownConfirmPassword(false)} />
                )
              }
              placeholder="Nhập lại mật khẩu"
            />
            <View className="w-[80%]">
              <HelperText type="error" visible={touched.confirmPassword && errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            </View>
          </View>
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
            Đăng ký
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default SignUpLayout;
