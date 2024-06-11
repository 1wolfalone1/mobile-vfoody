import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch } from 'react-redux';
import api from '../api/api';

const OauthRedirectLayout = () => {
  const dispatch = useDispatch();
  const handleAsyncLogin = async () => {
    const loginMsg = await AsyncStorage.getItem('@statusLogin');
    console.log(loginMsg, ' login message');
    if (loginMsg == 'error' || loginMsg == '' || loginMsg == null) {
      console.log(loginMsg, ' >error');
      router.replace('/sign-in');
    } else {
      getUserInfo()
    }
  };
  useEffect(() => {
    handleAsyncLogin();
  }, []);
  const getUserInfo = async () => {
    try {
      const res = await api.get('/api/v1/customer');
      const data = await res.data;
      console.log(data, "dffata");
      router.replace('/home');
    } catch (e) {
      console.log(e);
      router.push("/sign-in");
    }
  }
  return (
    <View>
      <Spinner visible={true} textContent={'Waiting...'} textStyle={styles.spinnerTextStyle} />
    </View>
  );
};

export default OauthRedirectLayout;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
