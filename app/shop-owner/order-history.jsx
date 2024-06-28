import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import OrderHistoryList from '../../components/shop-owner/OrderHistory';

const OrderHistory = () => {
  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Đơn hàng hiện tại
      </Text>
      {/* <OrderHistoryList /> */}
    </SafeAreaView>
  );
};

export default OrderHistory;
