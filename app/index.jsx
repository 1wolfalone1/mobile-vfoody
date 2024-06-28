import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { Colors, CommonConstants, Icons, Images } from '../constant';
import userInfoSlice, { userInfoSliceSelector } from '../redux/slice/userSlice';
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function StartPage() {
  const dispatch = useDispatch();
  const info = useSelector(userInfoSliceSelector);
  const getUserInfo = async () => {
    try {
      const res = await api.get('/api/v1/customer');
      const data = await res.data;
      console.log(data, 'dffata');
      if (data.isSuccess) {
        dispatch(
          userInfoSlice.actions.changeUserInfo({
            info: data.value,
            role: CommonConstants.USER_ROLE.USER,
          }),
        );
        router.replace('/home');
      } else {
        router.replace('/sign-in');
      }
    } catch (e) {
      console.log(e);
      router.push('/sign-in');
    }
  };
  const handleRoute = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      getUserInfo();
    } else {
      router.replace('/sign-in');
    }
  };
  const requestUserPermissions = async (req, res) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  const handleRegistrationDevice = async (token) => {
    try {
      console.log('Registration device token', token);
      const res = await api.put('/api/v1/customer/account/device-token', token, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.data;
      console.log(data, ' successfully registered device');
    } catch (err) {
      console.log(err, ' cannot register device');
    }
  };
  useEffect(() => {
    if (requestUserPermissions()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          if (info) handleRegistrationDevice(token);
        })
        .catch((err) => {
          console.log(err, ' cannot register device in message()');
        });
    } else {
      console.log('Permission denied');
    }
    messaging()
      .getInitialNotification()
      .then((notification) => {
        console.log(notification);
      });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage, 'on open');
    });
    messaging().setBackgroundMessageHandler(async (msg) => {
      console.log(msg, 'in background');
    });
    const unsubscribe = messaging().onMessage(async (msg) => {
      console.log(msg, 'in foreground');
      console.log('----------------------------------');
      showToastable({
        message: 'React Native Heroes is awesome! 🚀',
        status: 'success',
        renderContent: () => <NotifyFisebaseForegroundItem {...msg.notification} />,
      });
    });
    return unsubscribe;
  }, [info]);
  return (
    <View style={styles.container}>
      <Image
        className="absolute top-20 left-0 right-0 bottom-0 h-5/6 object-cover"
        resizeMode="stretch"
        source={Images.LogoCover}
      />
      <FadeInView className="w-full justify-center items-center">
        <View className="justify-center items-center mb-20">
          <Image className="w-52 h-52" resizeMode="contain" source={Icons.IconLight} />
          <Text className="text-3xl font-bold text-white">VFoody</Text>
        </View>
        <Button
          mode="contained-tonal"
          textColor={Colors.btnText}
          contentStyle={{
            paddingVertical: 8,
            width: '100%',
            backgroundColor: 'white',
          }}
          labelStyle={{
            fontSize: 24,
            lineHeight: 27,
          }}
          onPress={handleRoute}
        >
          Bắt đầu
        </Button>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.primaryBackgroundColor,
    paddingHorizontal: 1,
    gap: 60,
  },
});
