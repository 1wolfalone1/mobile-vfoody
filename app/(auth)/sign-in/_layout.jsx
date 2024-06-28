import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { router, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { Snackbar, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api/api';
import HeaderInAuth from '../../../components/common/HeaderInAuth';
import { Colors, CommonConstants, Images } from '../../../constant';
import persistSlice, { persistSliceSelector } from '../../../redux/slice/persistSlice';
import userInfoSlice from '../../../redux/slice/userSlice';

// const redirectUri = AuthSession.makeRedirectUri({
//   path: '/sign-in',
// });
const AuthenLayout = () => {
  console.log(`${BASE_URL}`, 'base url');
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get('window');
  const widthGoogleButton = parseInt((width * 80) / 100);
  const [userInfo, setUserInfo] = React.useState(null);
  const [loginErrorGoogleMessage, setLoginErrorGoogleMessage] = React.useState('');
  const isFocus = useIsFocused();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '378831586584-r6qbnlk6sqad743mf5b68voupgi06uk0.apps.googleusercontent.com',
    webClientId: '378831586584-tr3bua7id30bgc7mgfgefea3o0d7jjfq.apps.googleusercontent.com',
    iosClientId: '378831586584-ocjo4ctv8je4q9d2ungkola7fi81pp1e.apps.googleusercontent.com',
    // redirectUri: "/sign-in"
  });
  const { isReset, isSignup } = useSelector(persistSliceSelector);

  async function handleSignInWithGoogle() {
    console.log(response, ' response ne ');
    if (response === undefined || response === null) {
    } else if (response.type == 'success') {
      await AsyncStorage.setItem('@statusLogin', 'ok');
      await getUserInfo(response.authentication.accessToken);
    } else {
      console.log(response.error, ' error');
      await AsyncStorage.setItem('@statusLogin', 'error');

    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await api.post('/api/v1/customer/google/login', { accessToken: token });

      const user = await response.data;
      console.log(user, ' userrrrrrrrrrr');
      if (user.isSuccess) {
        await AsyncStorage.setItem('@token', user.value.accessTokenResponse.accessToken);
        
        dispatch(
          userInfoSlice.actions.changeUserInfo({
            info: user.value.accountResponse,
            role: CommonConstants.USER_ROLE.USER,
          }),
        );
      }
      router.push('/home');
    } catch (e) {
      console.log(e, ' errorrrr login with google');
    }
  };
  React.useEffect(() => {
    handleSignInWithGoogle();
    
  }, [response, isFocus, request]);

  useEffect(() => {
    // handleIsToken();
  }, []);
  const handleIsToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      router.push('/oauthredirect');
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-bg-100 flex-1 h-full">
        <Image
          className=" h-full absolute top-0 left-0 right-0 bottom-0"
          resizeMode="stretch"
          source={Images.LogoCoverDark}
        />
        <HeaderInAuth activePage="signIn" />
        <Slot screenOptions={{ Animation: 'flip' }} />
        <View className="flex-row justify-center items-center my-6">
          <View className="h-[1] w-[100] bg-black-200" />
          <Text className="mx-4">Or</Text>
          <View className="h-[1] w-[100] bg-black-200" />
        </View>
        <View className="items-center">
          <TouchableRipple
            className="bg-white rounded-3xl"
            borderless
            onPress={() => promptAsync()}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <View
              className="flex-row p-3 w-80 justify-center items-center rounded-3xl"
              style={{
                borderWidth: 1,
                borderColor: Colors.primaryBackgroundColor,
              }}
            >
              <Image
                className="h-[30] w-[30] mr-2"
                resizeMode="contain"
                source={Images.GoogleIcon}
              />
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đăng nhập bằng google</Text>
            </View>
          </TouchableRipple>
          <Text>{loginErrorGoogleMessage}</Text>
        </View>
        <Snackbar
          visible={isReset || isSignup}
          onDismiss={() => {
            if (isReset) {
              dispatch(persistSlice.actions.saveIsReset(false));
            } else if (isSignup) {
              dispatch(persistSlice.actions.saveIsSignup(false));
            }
          }}
          action={{
            label: 'Ok',
            onPress: () => {
              if (isReset) {
                dispatch(persistSlice.actions.saveIsReset(false));
              } else if (isSignup) {
                dispatch(persistSlice.actions.saveIsSignup(false));
              }
            },
            style: { color: 'red' },
          }}
          className="mb-4 bg-gray-500 mx-8 rounded-md text-lg bottom-0"
        >
          {isReset ? (
            <Text className="text-white">Đổi mật khẩu thành công!</Text>
          ) : isSignup ? (
            <Text className="text-white">Đăng ký tài khoản thành công!</Text>
          ) : (
            ''
          )}
        </Snackbar>
      </View>
    </ScrollView>
  );
};

export default AuthenLayout;
