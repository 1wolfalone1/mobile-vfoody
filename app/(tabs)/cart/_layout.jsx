import { Stack } from 'expo-router';
import React from 'react';
import { JsStack } from '../../../components/custom-stack/JsStack';
const CartLayout = () => {
  return (
    <JsStack screenOptions={{ animation: 'slide_from_bottom', headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: 'fade_from_bottom', headerShown: false }} />
      <JsStack.Screen
        name="[shopId]"
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
    </JsStack>
  );
};

export default CartLayout;
