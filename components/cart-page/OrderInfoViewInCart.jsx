import { router } from 'expo-router';
import { Info } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { orderSelector } from '../../redux/slice/orderSlice';

const OrderInfoViewInCart = ({ userInfo, info }) => {
  const { orderInfo } = useSelector(orderSelector);
  return (
    <View className="my-5 pl-8">
      <View className="flex-row items-center ">
        <View className="flex-row items-center">
          <Info color={'green'} size={28} />
          <Text className="ml-2 text-lg font-bold">Thông tin giao hàng</Text>
        </View>
        <View>
          <Button onPress={() => router.push('/cart/' + info.id + '/change-info')}>Thay đổi</Button>
        </View>
      </View>
      <View className="ml-2">
        <View className="flex-row items-center mt-2">
          <Text className="font-hnow64regular text-gray-600">{orderInfo.fullName}</Text>
          <Divider
            className="h-full "
            style={{
              width: 1,
              marginHorizontal: 20,
            }}
          />
          <Text className="font-hnow64regular text-gray-600">{orderInfo.phoneNumber}</Text>
        </View>
        <View className="mt-2 ">
          <Text className="font-hnow64regular text-gray-700">{orderInfo?.building?.address}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderInfoViewInCart;
