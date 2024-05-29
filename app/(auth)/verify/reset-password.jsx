import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import HeaderInForgot from '../../../components/common/HeaderInForgot';
import { Colors } from '../../../constant';

const validationSchema = yup.object().shape({
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

export default function ResetPassword() {
  const [isShowPassword, setIsShownPassword] = useState(false);
  const [isShowConfirmPassword, setIsShownConfirmPassword] = useState(false);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <HeaderInForgot
        back="verify/forgot-password"
        title="Đặt mật khẩu mới"
        des="Nhập mật khẩu mới mà bạn muốn đặt"
      />

      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={(values) => {
          router.push('sign-in');
          // handle logic here to sent email to reset password
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View className="flex items-center">
            <View className="w-full items-center">
              <TextInput
                style={{ backgroundColor: 'transparent', width: '80%' }}
                type="flat"
                onBlur={handleBlur('password')}
                dense
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={!isShowPassword}
                right={
                  !isShowPassword ? (
                    <TextInput.Icon icon="eye-off" onPress={() => setIsShownPassword(true)} />
                  ) : (
                    <TextInput.Icon icon="eye" onPress={() => setIsShownPassword(false)} />
                  )
                }
                placeholder="Nhập mật khẩu mới"
              />
              <View className="w-[80%]">
                <HelperText type="error" visible={touched.password && errors.password}>
                  {errors.password}{' '}
                </HelperText>
              </View>
            </View>
            <View className="w-full items-center">
              <TextInput
                style={{ backgroundColor: 'transparent', width: '80%' }}
                type="flat"
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry={!isShowConfirmPassword}
                right={
                  !isShowConfirmPassword ? (
                    <TextInput.Icon
                      icon="eye-off"
                      onPress={() => setIsShownConfirmPassword(true)}
                    />
                  ) : (
                    <TextInput.Icon icon="eye" onPress={() => setIsShownConfirmPassword(false)} />
                  )
                }
                placeholder="Nhập lại mật khẩu"
              />
              <View className="w-[80%]">
                <HelperText
                  type="error"
                  visible={touched.confirmPassword && errors.confirmPassword}
                >
                  {errors.confirmPassword}{' '}
                </HelperText>
              </View>
            </View>
            <Button
              buttonColor={Colors.primaryBackgroundColor}
              textColor={Colors.commonBtnText}
              mode="elevated"
              style={{ width: '80%' }}
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
              }}
              labelStyle={{
                fontFamily: 'HeadingNow-64Regular',
                fontSize: 16,
                fontWeight: 700,
              }}
              onPress={handleSubmit}
            >
              Đặt lại mật khẩu
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
