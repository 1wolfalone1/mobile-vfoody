import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { Slot } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import api from '../../../api/api';
import HeaderInAuth from '../../../components/common/HeaderInAuth';
import { Colors, CommonConstants, Images } from '../../../constant';
import userInfoSlice from '../../../redux/slice/userSlice';

// const redirectUri = AuthSession.makeRedirectUri({
//   path: '/sign-in',
// });
const AuthenLayout = () => {
  const { width, height } = Dimensions.get('window');
  const widthGoogleButton = parseInt((width * 80) / 100);
  const [userInfo, setUserInfo] = React.useState(null);
  const [loginErrorGoogleMessage, setLoginErrorGoogleMessage] = React.useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '378831586584-r6qbnlk6sqad743mf5b68voupgi06uk0.apps.googleusercontent.com',
    webClientId: '378831586584-tr3bua7id30bgc7mgfgefea3o0d7jjfq.apps.googleusercontent.com',
    iosClientId: '378831586584-ocjo4ctv8je4q9d2ungkola7fi81pp1e.apps.googleusercontent.com',
    // redirectUri: "/sign-in"
  });
  async function handleSignInWithGoogle() {
    const dispatch = useDispatch();
    console.log(response, ' response ne ');
    if (response === undefined || response === null) {
    } else {
      if (response.type == 'success') {
        await AsyncStorage.setItem('@statusLogin', 'ok');
        await getUserInfo(response.authentication.accessToken);
      } else {
        console.log(response.error, ' error');
        await AsyncStorage.setItem('@statusLogin', 'error');
      }
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await api.post('/api/v1/customer/google/login', { accessToken: token });
      const user = await response.data;
      console.log(user ,' userrrrrrrrrrr')
      if (user.isSuccess) {
        await AsyncStorage.setItem('@token', user.value.accessTokenResponse.accessToken);
        dispatch(userInfoSlice.actions.changeUserInfo({
          info: user.value.accountResponse,
          role: CommonConstants.USER_ROLE.USER,
        })) 
      }
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-bg-100 flex-1 h-full">
        <Image
          className=" h-full absolute top-0 left-0 right-0 bottom-0"
          resizeMode="stretch"
          source={Images.LogoCoverDark}
        />
        <HeaderInAuth activePage={'signIn'} />
        <Slot screenOptions={{ Animation: 'flip' }} />
        <View className="flex-row justify-center  items-center my-8">
          <View className="h-[1] w-[100] bg-black-200"></View>
          <Text className="mx-4">Or</Text>
          <View className="h-[1] w-[100] bg-black-200"></View>
        </View>
        <View className="items-center">
          <TouchableRipple
            className="bg-white rounded-full"
            borderless
            onPress={() => promptAsync()}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <View
              className=" flex-row p-3   justify-between items-center rounded-full"
              style={{
                borderWidth: 1,
                borderColor: Colors.primaryBackgroundColor,
              }}
            >
              <Image
                className="h-[40] w-[40] mr-4"
                resizeMode="contain"
                source={Images.GoogleIcon}
              />
              <Text style={{ lineHeight: 24, fontSize: 20 }}>Sign in with google</Text>
            </View>
          </TouchableRipple>
          <Text>{loginErrorGoogleMessage}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthenLayout;
