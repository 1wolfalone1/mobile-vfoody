import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderList from '../../components/shop-owner/Order';
import { Divider } from 'react-native-paper';

const Order = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Đơn hàng hiện tại
      </Text>
      <Divider className='mt-2'/>
      <OrderList />
    </SafeAreaView>
  );
};

export default Order;
