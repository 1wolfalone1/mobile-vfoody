import React from 'react';
import { Text, View } from 'react-native';
import OrderList from '../../components/shop-owner/Order';
import { SafeAreaView } from 'react-native-safe-area-context';

const Order = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Đơn hàng đang chuẩn bị
      </Text>
      <OrderList />
    </SafeAreaView>
  );
};

export default Order;
