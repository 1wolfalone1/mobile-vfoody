import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import api from '../../../api/api';
import { Colors } from '../../../constant';
import { persistSliceSelector } from '../../../redux/slice/persistSlice';
import OrderHistoryList from './OrderHistoryList';

export default function OrderHistory() {
  const [isActiveTab, setIsActiveTab] = useState(4);
  const [orders, setOrders] = useState([]);
  const { isRefreshOrder } = useSelector(persistSliceSelector);

  const fetchOrders = async (status) => {
    try {
      if (status === 5) {
        const canceled = await api.get('/api/v1/shop/order?status=5');
        const failed = await api.get('/api/v1/shop/order?status=6');
        const rejected = await api.get('/api/v1/shop/order?status=7');
        if (canceled.data.isSuccess && failed.data.isSuccess && rejected.data.isSuccess) {
          setOrders([
            ...canceled.data?.value?.items,
            ...failed.data?.value?.items,
            ...rejected.data?.value?.items,
          ]);
        }
      } else {
        const res = await api.get(`/api/v1/shop/order?status=${status}`);
        if (res.data.isSuccess) {
          setOrders(res.data?.value?.items);
        }
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
  }, [isActiveTab, isRefreshOrder]);

  return (
    <SafeAreaView className="mx-4">
      <ScrollView>
        <View className="flex-row">
          {[4, 5].map((tab) => (
            <View
              key={tab}
              className={`w-[50%] ${isActiveTab === tab ? 'border-b-2 border-b-primary' : ''}`}
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
                {tab === 4 ? 'Thành công' : 'Thất bại'}
              </Button>
            </View>
          ))}
        </View>
        <View className="mb-20">
          {orders.length === 0 ? (
            <Text className="text-center text-xl text-red-500 mt-64">Không có đơn hàng nào</Text>
          ) : (
            orders?.map((item) => {
              return <OrderHistoryList key={item.id} item={item} isActiveTab ={isActiveTab}/>;
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
