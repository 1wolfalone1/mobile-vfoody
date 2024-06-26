import messaging from '@react-native-firebase/messaging';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useContext, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Toastable, { showToastable } from 'react-native-toastable';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import NotifyFisebaseForegroundItem from '../components/common/NotifyFisebaseForegroundItem';
import SnackBarCustom from '../components/common/SnackBarCustom';
import SpinnerCustom from '../components/common/SpinnerCustom';
import { store } from '../redux/store';
let persistor = persistStore(store);
const RootLayout = () => {
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
  const insets = useContext(SafeAreaInsetsContext);
  useEffect(() => {
    if (requestUserPermissions()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
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
  }, []);
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'HeadingNow-21Thin': require('../assets/fonts/HeadingNow-21Thin.otf'),
    'HeadingNow-22Light': require('../assets/fonts/HeadingNow-22Light.otf'),
    'HeadingNow-23Book': require('../assets/fonts/HeadingNow-23Book.otf'),
    'HeadingNow-55Medium': require('../assets/fonts/HeadingNow-55Medium.otf'),
    'HeadingNow-61Thin': require('../assets/fonts/HeadingNow-61Thin.otf'),
    'HeadingNow-62Light': require('../assets/fonts/HeadingNow-62Light.otf'),
    'HeadingNow-63Book': require('../assets/fonts/HeadingNow-63Book.otf'),
    'HeadingNow-64Regular': require('../assets/fonts/HeadingNow-64Regular.otf'),
    'HeadingNow-65Medium': require('../assets/fonts/HeadingNow-65Medium.otf'),
  });
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  SystemUI.setBackgroundColorAsync('black');
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Stack screenOptions={{ animation: 'slide_from_bottom' }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name="oauthredirect"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="shop"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="shop-owner"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="(settings)"
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />
          </Stack>
          <SnackBarCustom />
          <SpinnerCustom />
          <Toastable
            statusMap={{
              success: 'red',
            }}
            offset={insets.top + 30}
            duration={10000}
          />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
