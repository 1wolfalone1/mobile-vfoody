import { Stack } from 'expo-router';
import React from 'react';
import { JsStack } from '../../../../components/custom-stack/JsStack';

const IndexLayout = () => {
  return (
    <JsStack
    initialRouteName="list-order-shipping"
    screenOptions={{ animation: 'slide_from_bottom', headerShown: false 
      
    }}>
      <Stack.Screen name="list-order-shipping" options={{ animation: 'fade_from_bottom', headerShown: false ,
        
      }} />
      <JsStack.Screen
        name="[orderId]"
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
    </JsStack>
  );
};

export default IndexLayout;
