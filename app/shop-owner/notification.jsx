import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationList from '../../components/shop-owner/Notification';
import { Divider } from 'react-native-paper';

const Notification = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Thông báo
      </Text>
      <Divider className='mt-4' />
      <NotificationList />
    </SafeAreaView>
  );
};

export default Notification;
