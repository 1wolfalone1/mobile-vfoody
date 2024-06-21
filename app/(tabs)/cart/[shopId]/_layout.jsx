import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { JsStack } from '../../../../components/custom-stack/JsStack';

const UserLayout = () => {
  return (
    <JsStack screenOptions={{ animation: 'slide_from_bottom' }}>
      <JsStack.Screen name="index" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <JsStack.Screen
        name="change-info"
        options={{
          headerShown: false,
          mode: 'model',
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <JsStack.Screen
        name="voucher"
        options={{
          headerShown: false,
          mode: 'model',
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </JsStack>
  );
};

export default UserLayout;

