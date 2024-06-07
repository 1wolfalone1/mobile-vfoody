import React from 'react';
import { Text, View } from 'react-native';
import OrderList from '../../components/shop-owner/Order';

const Order = () => {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Đơn hàng đang chuẩn bị
      </Text>
      <OrderList />
    </View>
  );
}

export default Order