import { router, useLocalSearchParams } from 'expo-router';
import { ChevronRight, HandCoins, LocateFixed, MapPin, Truck } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Avatar, Button, Divider, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ItemInCart from '../../../components/cart-page/ItemInCart';
import { Colors } from '../../../constant';
import cartSlice, { cartSelector, getCartInfo } from '../../../redux/slice/cartSlice';
import { dataShopDetailsSelector } from '../../../redux/slice/shopDetailsSlice';

const CartItemInShop = () => {
  const {shopId}= useLocalSearchParams();
  const { width, height } = Dimensions.get('window');
  const widthItem = parseInt((width * 85) / 100);
  const { listItemInfo, items } = useSelector(cartSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(listItemInfo);
    if (shopId) {
      console.log(' is herrrrrrrrrrrrrrrrrrrrr', shopId);
      dispatch(getCartInfo(shopId));
    }
    return () => {
      dispatch(cartSlice.actions.resetStateListItemInfo())
    }
  }, [items]);
  return (
    <View className="flex-1 bg-white overflow-visible">
      <View className="pl-8 pt-8">
        <View className="gap-2">
          <View className="flex-row items-center">
            <Avatar.Image
              className="bg-transparent"
              size={24}
              source={{
                uri: 'https://static-00.iconduck.com/assets.00/golang-icon-1594x2048-0xixr8zr.png',
              }}
            />
            <Text className="ml-2 text-lg font-hnow65medium">Tiệm Bánh Mì Đêm</Text>
          </View>
          <View className="flex-row items-center">
            <MapPin color={Colors.greyText} size={20} />
            <Text className="ml-1 text-gray-600"> tòa S1010 khu Berkely</Text>
          </View>
        </View>

        <View className="gap-2 mt-4">
          <View className="flex-row items-center">
            <LocateFixed color={Colors.primaryBackgroundColor} size={28} />
            <Text className="ml-2 text-lg font-hnow65medium">Giao tới</Text>
          </View>
          <TouchableRipple
            className=""
            onPress={() => {}}
            rippleColor="rgba(31, 30, 30, 0)"
            borderless
          >
            <View className="flex-row items-center">
              <MapPin color={Colors.greyText} size={20} />
              <Text className="ml-1 text-green-700"> tòa S705 khu Origami</Text>
              <ChevronRight color={Colors.primaryBackgroundColor} size={24} />
            </View>
          </TouchableRipple>
        </View>
        <View className="gap-2 my-5">
          <View className="flex-row items-center">
            <Truck color={Colors.primaryBackgroundColor} size={28} />
            <Text className="ml-2 text-lg font-hnow65medium">Phí giao hàng</Text>
          </View>
          <View className="flex-row items-center">
            <HandCoins color={Colors.greyText} size={20} />
            <Text className="ml-1 text-gray-600"> Freeship</Text>
          </View>
        </View>
      </View>
      <ScrollView
        className="flex-1 bg-white w-full"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View className="p-8" style={{ width: widthItem }}>
          <View className="mb-5">
            <Text className="ml-2 text-lg font-psemibold">Thông tin đơn hàng</Text>
          </View>
          {listItemInfo.map((item) => (
            <ItemInCart key={item.id} item={item} shopId={shopId} />
          ))}
          <View className="" style={{ width: widthItem }}>
            <Divider className="my-4 bg-black-700 h-0.5" />
            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Tạm tính</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">40.000</Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>
            <Divider className="my-2 bg-green-200 h-[1]" />
            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Phí giao hàng</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">0.000</Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>
            <Divider className="my-2 bg-green-200 h-[1]" />
            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Khuyến mãi</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">-10.000</Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>

            <Divider className="my-4 bg-black-700 h-0.5 " />
          </View>
          <View className="flex-row justify-between" style={{ width: widthItem }}>
            <Text className="font-hnow65medium text-lg">Tổng cộng</Text>
            <View className="flex-row">
              <Text className="font-hnow64regular text-2xl text-primary">50.000</Text>
              <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
            </View>
          </View>
          <View className="mt-8" style={{ width: widthItem }}>
            <Button
              mode="elevated"
              textColor="white"
              buttonColor={Colors.primaryBackgroundColor}
              theme={{ roundness: 4 }}
              contentStyle={{
                paddingVertical: 4,
              }}
              className="rounded-full"
              labelStyle={{
                fontFamily: 'HeadingNow-64Regular',
                fontSize: 20,
                lineHeight: 22,
              }}
              onPress={() => router.push('/home')}
            >
              Đặt hàng
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartItemInShop;

const data = [
  {
    id: 1,
    image:
      'https://product.hstatic.net/200000567755/product/banh_mi_nam_nuong_1_giac_da_doi_2_1f6a3c07e26647b7892757f0bc54b494.png',
    name: 'Bánh mì nướng',
    price: '50.000đ',
    quantity: 1,
    topping: ['Cay', 'Sốt sa tế'],
  },
  {
    id: 2,
    image:
      'https://product.hstatic.net/200000567755/product/banh_mi_nam_nuong_1_giac_da_doi_2_1f6a3c07e26647b7892757f0bc54b494.png',
    name: 'Bánh mì nướng',
    price: '50.000đ',
    quantity: 1,
    topping: ['Cay', 'Sốt sa tế'],
  },
  {
    id: 3,
    image:
      'https://product.hstatic.net/200000567755/product/banh_mi_nam_nuong_1_giac_da_doi_2_1f6a3c07e26647b7892757f0bc54b494.png',
    name: 'Bánh mì nướng',
    price: '50.000đ',
    quantity: 1,
    topping: ['Cay', 'Sốt sa tế'],
  },
];
