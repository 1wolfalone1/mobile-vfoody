import { Stack } from 'expo-router';
import React from 'react';

const UserLayout = () => {
  return (
    <Stack screenOptions={{ animation: 'slide_from_bottom' }}>
      <Stack.Screen name="user" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </Stack>
  );
};

export default UserLayout;
