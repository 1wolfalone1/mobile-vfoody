import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationList from '../../components/shop-owner/Notification';

const Notification = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-center text-2xl my-4 font-semibold">Thông báo</Text>
      <NotificationList />
    </SafeAreaView>
  );
};

export default Notification;
