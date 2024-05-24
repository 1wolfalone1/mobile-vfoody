import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

const OauthRedirectLayout = () => {
  const dispatch = useDispatch();
  const handleAsyncLogin = async () => {
    const loginMsg = await AsyncStorage.getItem('@statusLogin');
    console.log(loginMsg, ' login message');
    if (loginMsg == 'error' || loginMsg == '' || loginMsg == null) {
      console.log(loginMsg, ' >error');
      router.replace('/sign-in');
    } else {
      router.replace('/home');
    }
  };
  useEffect(() => {
    handleAsyncLogin();
  }, []);
  return (
    <View>
      <Text>OauthredirectLayout</Text>
    </View>
  );
};

export default OauthRedirectLayout;
