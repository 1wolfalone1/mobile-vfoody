import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ItemInCart from '../../components/cart-page/ItemInCart';
import { Colors } from '../../constant';
import { cartSelector, getCartInfo } from '../../redux/slice/cartSlice';
import { dataShopDetailsSelector } from '../../redux/slice/shopDetailsSlice';

const TempCartPage = () => {
  const { listItemInfo, items } = useSelector(cartSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(listItemInfo);
    if (info?.id) {
      console.log(' is herrrrrrrrrrrrrrrrrrrrr', info.id);
      dispatch(getCartInfo(info?.id));
    }
  }, [items]);
  return (
    <View className="bg-white flex-1">
      <View
        className="flex-row justify-between items-center"
        style={{
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: Colors.greyText,
          borderRadius: 40,
          marginBottom: 30,
        }}
      >
        <View className="w-[100] items-start">
          <Button
            labelStyle={{ color: 'red', fontFamily: 'HeadingNow-63Book', fontSize: 12 }}
            onPress={() => {}}
          >
            Xóa tất cả
          </Button>
        </View>
        <Text className=" font-hnow64regular text-lg">Giỏ hàng nè</Text>
        <View className="w-[100] justify-end items-end">
          <IconButton
            onPress={() => router.back()}
            iconColor="red"
            icon="close"
            style={{
              padding: 0,
              margin: 0,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingBottom: 20
        }}
      >
        {listItemInfo?.map((item) => (
          <ItemInCart key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TempCartPage;
