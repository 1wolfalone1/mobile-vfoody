import { router } from 'expo-router';
import { Formik } from 'formik';
import { Image } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import HeaderInForgot from '../../../components/common/HeaderInForgot';
import { Colors, Images } from '../../../constant';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ!')
    .max(50, 'Email tối đa 50 ký tự!')
    .required('Vui lòng nhập email'),
});

export default function ForgotPassword() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-bg-100 flex-1 h-full">
        <Image
          className=" h-full absolute top-0 left-0 right-0 bottom-0"
          resizeMode="stretch"
          source={Images.LogoCoverDark}
        />
        <HeaderInForgot
          back="/sign-in"
          title="Quên mật khẩu"
          des="Nhập email bạn muốn lấy lại mật khẩu"
        />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            router.push('verify/verify-code');
            // handle logic here to sent email to reset password
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View className="flex gap-4 justify-center items-center">
              <View className="w-full items-center">
                <TextInput
                  style={{ backgroundColor: 'transparent', width: '80%' }}
                  type="flat"
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Nhập email của bạn"
                />
                <View className="w-[80%]">
                  <HelperText type="error" visible={touched.email && errors.email}>
                    {errors.email}{' '}
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
                Lấy lại mật khẩu
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
