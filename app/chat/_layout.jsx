import auth from '@react-native-firebase/auth';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Colors } from '../../constant';
const ChatLayout = () => {
  function onAuthStateChanged(user) {
    console.log(user, 'Auth state changed')
  }
  const authenticateWithFirebase = async () => {
    const authState = await auth().signInWithCustomToken(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzaUtOdExLaWRZU3B2NldCdW01S1BZbHV6WnYxIiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstY2p1NHNAdmZvb2R5LTg0Y2EyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstY2p1NHNAdmZvb2R5LTg0Y2EyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJleHAiOjE3MTk0MDMyNjEsImlhdCI6MTcxOTM5OTY2MX0.bnObdS6AO80_9rb3lgPUsQgYqAQFFo8GO9Twjr76VF0H_KqrJ9OLtxcA_RqcJnS0H-JlGIKn2DiVU6JGHWo7jjDEj30mcq5f07OIzA1-jBa2OyTD_2a_vzkvQh26RFBqOIqNdmfFfWIZvd6M-YZrCZ_Kz7aFLJ_8OZpEFMuG5PGUuQoL6wGzJNsCk-QGJS8bKYj8u0ZuP2tUPAmLaWEmQt5I01WkXO1RsKcJOZgpMSigBWa3WFTq_1RYBhsTF8gFYeb8nkeTyPlDM1zJ00pvLCp1QYJYPK0Gomhv0pe_vOiFqMrpamaToM3ufoZyhuDSx1NhJ2fZ3dIx3mWVH3pQuQ',
    );
    const test = authState.user;
    console.log(test, 'test');
  };
  useEffect(() => {
    authenticateWithFirebase();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <Stack screenOptions={{ animation: 'slide_from_bottom' }}>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: Colors.primaryBackgroundColor,
          },
          headerBackTitleStyle: {
            color: '#fff',
          },
          headerTitle: 'Tin nhắn',
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackButtonMenuEnabled: true,
          headerLeft: () => {
            return (
              <TouchableRipple
                onPress={() => router.back()}
                borderless
                className="rounded-full items-center justify-center p-4"
              >
                <ArrowLeft size={24} color={'white'} strokeWidth={2} />
              </TouchableRipple>
            );
          },
        }}
      />
      <Stack.Screen name="[id]" options={{ animation: 'slide_from_bottom', headerShown: false }} />
    </Stack>
  );
};

export default ChatLayout;
