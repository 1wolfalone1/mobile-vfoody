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
    .email('Invalid email')
    .max(50, 'Email must be at most 50 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password must be at most 25 characters')
    .required('Password is required'),
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
              placeholder="Email address"
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
                  <TextInput.Icon icon="eye" onPress={(state) => setIsShownPassword(true)} />
                ) : (
                  <TextInput.Icon icon="eye-off" onPress={(state) => setIsShownPassword(false)} />
                )
              }
              placeholder="Password"
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
              fontSize: 16,
              lineHeight: 19,
            }}
            onPress={handleSubmit}
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
