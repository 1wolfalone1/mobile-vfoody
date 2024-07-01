import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JsStack } from '../../../../components/custom-stack/JsStack';
import globalSlice from '../../../../redux/slice/globalSlice';
const IndexLayout = () => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = auth().currentUser;
    console.log('user', user);
    const query1 = firestore()
      .collection('Notify')
      .doc('thientryhard@gmail.com:user')
      .collection('Notification');

    const query2 = query1.where('Type', '==', 'order');
    const subscriber = query2.onSnapshot((documentSnapshot) => {
      documentSnapshot.docs.forEach((doc) => {
        if (!doc.data().isRead) {
          console.log('doc', doc);
          dispatch(globalSlice.actions.notifyOrderStatusChange());
          query1.doc(doc.id).update({
            isRead: true,
          });
        }
      });
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [isFocus]);
  return (
    <JsStack
      initialRouteName="list-order-shipping"
      screenOptions={{ animation: 'slide_from_bottom', headerShown: false }}
    >
      <Stack.Screen
        name="list-order-shipping"
        options={{ animation: 'fade_from_bottom', headerShown: false }}
      />
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
