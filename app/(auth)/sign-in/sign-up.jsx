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
  phoneNumber: yup
    .string()
    .min(8, 'Phone number must be at least 8 characters')
    .max(11, 'Phone number must be at most 11 characters')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(25, 'Password must be at most 25 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
const SignUpLayout = () => {
  const [isShowPassword, setIsShownPassword] = useState(false);
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
              dense={true}
              onBlur={handleBlur('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              placeholder="Email"
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
              dense={true}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              keyboardType="phone-pad"
              placeholder="Phone Number"
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
              dense={true}
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
          <View className="w-full flex-1 items-center mb-5">
            <TextInput
              style={{ backgroundColor: 'transparent', width: '80%' }}
              type="flat"
              dense={true}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={!isShowPassword}
              placeholder="Confirm Password"
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
