import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderHistoryList from '../../components/shop-owner/order-history/OrderHistory';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constant';
import { Divider } from 'react-native-paper';

const OrderHistory = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row py-4 items-center pl-5">
        <MaterialIcons
          name="arrow-back-ios-new"
          size={36}
          color={Colors.primaryBackgroundColor}
          onPress={() => {
            router.push('/shop-owner/dashboard')
          }}
        />
        <Text className="font-bold text-2xl pl-16">Lịch sử đơn hàng</Text>
      </View>
      <Divider className='mt-2' />
      <OrderHistoryList />
    </SafeAreaView>
  );
};

export default OrderHistory;
