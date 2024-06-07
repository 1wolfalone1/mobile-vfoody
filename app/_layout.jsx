import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import SnackBarCustom from '../components/common/SnackBarCustom';
import { store } from '../redux/store';
const RootLayout = () => {
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
  return (
    <Provider store={store}>
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
        <Stack.Screen name="shop" options={{ headerShown: false, animation: "slide_from_bottom" }} />
        <Stack.Screen name="shop-owner" options={{ headerShown: false, animation: "slide_from_bottom" }} />
      </Stack>
      <SnackBarCustom />
    </Provider>
  );
};

export default RootLayout;
