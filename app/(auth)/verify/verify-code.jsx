import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import HeaderInForgot from '../../../components/common/HeaderInForgot';
import { Colors } from '../../../constant';

export default function VerifyCode() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    setVerificationCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      // handle verify code logic here
      console.log('verificationCode', verificationCode.join(''));
      router.push('verify/reset-password');
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <HeaderInForgot
        back="verify/reset-password"
        title="Nhập mã xác thực"
        des="Vui lòng nhập mã xác thực bạn vừa nhận được"
      />
      <View className="w-full flex items-center justify-center">
        <View className="w-4/5 items-center justify-center flex flex-row gap-8">
          {verificationCode.map((digit, index) => (
            <TextInput
              style={{ backgroundColor: 'transparent', width: '16%' }}
              type="flat"
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              dense
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </View>
        {isError && <Text className="text-red-600 text-sm mt-4">Mã xác thực không hợp lệ!</Text>}
        <View className="flex flex-row gap-1 mt-4">
          <Text>Bạn không nhận được mã?</Text>
          <TouchableOpacity
            onPress={() => {
              setVerificationCode(['', '', '', '']);
            }} // handle resend code
          >
            <Text className="font-bold text-orange-600">Gửi lại</Text>
          </TouchableOpacity>
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
          className="mt-8"
          labelStyle={{
            fontFamily: 'HeadingNow-64Regular',
            fontSize: 16,
            fontWeight: 700,
          }}
          onPress={onFormSubmit}
        >
          Xác thực
        </Button>
      </View>
    </ScrollView>
  );
}
