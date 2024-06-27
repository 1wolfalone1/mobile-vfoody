import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/api';
import { Colors } from '../../constant';
import OrderList from './current-order/OrderList';

export default function Order() {
  const [isActiveTab, setIsActiveTab] = useState(1);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (status) => {
    try {
      const res = await api.get(`/api/v1/shop/order?status=${status}`);
      if (res.data.isSuccess) {
        setOrders(res.data?.value?.items);
      }
    } catch (err) {
      console.error(err, `>>> error in fetchOrders with status ${status}`);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchOrders(isActiveTab);
    }
    return () => {
      isMounted = false;
    };
  }, [isActiveTab]);

  return (
    <SafeAreaView className="mx-4">
      <ScrollView>
        <View className="flex-row justify-between w-full">
          {[1, 2, 3].map((tab) => (
            <View
              key={tab}
              className={`${isActiveTab === tab ? 'border-b-2 border-b-primary' : ''} ${tab === 2 ? 'w-[40%]' : 'w-[30%]'}`}
            >
              <Button
                mode="text"
                textColor={
                  isActiveTab === tab ? Colors.primaryBackgroundColor : Colors.tertiaryTextColor
                }
                theme={{ roundness: 0 }}
                contentStyle={{ paddingVertical: 8 }}
                labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
                onPress={() => {
                  if (isActiveTab !== tab) {
                    setIsActiveTab(tab);
                  }
                }}
              >
                {tab === 1 ? 'Đơn mới' : tab === 2 ? 'Đang chuẩn bị' : 'Đang giao'}
              </Button>
            </View>
          ))}
        </View>
        <View className="mb-20">
          {orders.length === 0 ? (
            <Text className="text-center text-xl text-red-500 mt-64">Không có đơn hàng nào</Text>
          ) : (
            orders?.map((item) => {
              return <OrderList item={item} isActiveTab={isActiveTab}/>;
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
