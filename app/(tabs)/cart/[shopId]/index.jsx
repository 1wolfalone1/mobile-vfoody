import { router, useLocalSearchParams } from 'expo-router';
import { HandCoins, Ticket, Truck } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import CartHeader from '../../../../components/cart-page/CartHeader';
import ItemInCart from '../../../../components/cart-page/ItemInCart';
import OrderInfoViewInCart from '../../../../components/cart-page/OrderInfoViewInCart';
import { Colors } from '../../../../constant';
import cartSlice, { cartSelector, getCartInfo } from '../../../../redux/slice/cartSlice';
import globalSlice from '../../../../redux/slice/globalSlice';
import orderSlice, {
  orderSelector,
  orderTotalOrderSelector,
} from '../../../../redux/slice/orderSlice';
import { dataShopDetailsSelector, getShopInfo } from '../../../../redux/slice/shopDetailsSlice';
import { userInfoSliceSelector } from '../../../../redux/slice/userSlice';
import { formatQuantity } from '../../../../utils/MyUtils';

const CartItemInShop = () => {
  const apiKey = process.env.EXPO_PUBLIC_SERVICE_API;
  const { shopId } = useLocalSearchParams();
  const { width, height } = Dimensions.get('window');
  const widthItem = parseInt((width * 85) / 100);
  const { listItemInfo, items } = useSelector(cartSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const userInfo = useSelector(userInfoSliceSelector);
  const { orderPrice, ship } = useSelector(orderSelector);
  const totalOrderPrice = useSelector(orderTotalOrderSelector);
  const dispatch = useDispatch();
  const { orderInfo } = useSelector(orderSelector);
  useEffect(() => {
    dispatch(
      orderSlice.actions.changeOrderInfo({
        fullName: userInfo.fullName,
        phoneNumber: userInfo.phoneNumber,
        building: {
          address: userInfo.building.address,
          longitude: userInfo.building.longitude,
          latitude: userInfo.building.latitude,
        },
      }),
    );
    return () => {};
  }, []);
  console.log(items[shopId], ' cart info');
  useEffect(() => {
    dispatch(globalSlice.actions.changePositionTabBar(500));
    console.log(listItemInfo);
    if (shopId) {
      console.log(' is herrrrrrrrrrrrrrrrrrrrr', shopId);
      dispatch(getCartInfo(shopId));
      dispatch(getShopInfo(shopId));
    }
    return () => {
      dispatch(cartSlice.actions.resetStateListItemInfo());
      dispatch(orderSlice.actions.resetState());
      dispatch(globalSlice.actions.changePositionTabBar(0));
    };
  }, []);
  useEffect(() => {
    if (items[shopId]) {
      dispatch(orderSlice.actions.calculateTotalProductPrice(items[shopId]));
    }
  }, [items]);
  console.log(orderPrice, '0-00000');
  return (
    <SafeAreaView className="flex-1 bg-white overflow-visible">
      <MapViewDirections
        apikey={apiKey}
        origin={orderInfo?.building}
        destination={info?.building}
        onReady={(result) => {
          dispatch(orderSlice.actions.changeShipInfo({
            distance: result.distance,
            duration: result.duration,
          }))
        }}
      ></MapViewDirections>

      <CartHeader info={info} />
      <ScrollView
        className="flex-1 bg-white w-full  pb-[120]"
        contentContainerStyle={{
          marginBottom: 100,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <OrderInfoViewInCart userInfo={userInfo} info={info} />
        <View className="my-0 pl-8">
          <View className="flex-row items-center">
            <Truck color={'blue'} size={28} />
            <Text className="ml-2 text-lg font-bold">Phí giao hàng</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <HandCoins color={Colors.greyText} size={20} />
            <Text className="ml-1 text-gray-600">Freeship</Text>
            <Divider
              className="h-full "
              style={{
                width: 1,
              }}
            />
            <Text>
              {parseFloat(ship.distance).toPrecision(2)}
               km - {parseFloat(ship.duration).toPrecision(2)} phút
            </Text>
          </View>
        </View>
        <View className="p-8" style={{ width: widthItem }}>
          <View className="mb-5">
            <Text className="ml-2 text-lg font-psemibold">Thông tin đơn hàng</Text>
          </View>
          {listItemInfo.map((item) => (
            <ItemInCart key={item.id} item={item} shopId={shopId} />
          ))}
          <View className="" style={{ width: widthItem }}>
            <Divider className="mt-4 bg-black-700 h-0.5" />
            <View className="flex-row justify-between bg-red-100 py-1">
              <View className="flex-row items-center ml-2">
                <Ticket color="red" />
                <Text className="ml-2 font-hnow64regular text-gray-800">Voucher</Text>
              </View>
              <View>
                <Button
                  icon="chevron-right"
                  onPress={() => router.push('/cart/' + info.id + '/voucher')}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                  labelStyle={{ margin: 0 }}
                  contentStyle={{
                    flexDirection: 'row-reverse',
                    margin: 0,
                    paddingHorizontal: 0,
                  }}
                >
                  Chọn voucher
                </Button>
              </View>
            </View>
            <Divider className="mb-4 bg-black-700 h-0.5" />
            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Tạm tính</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">
                  {formatQuantity(orderPrice.totalProduct)}
                </Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>
            <Divider className="my-2 bg-green-200 h-[1]" />
            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Phí giao hàng</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">
                  {orderPrice.shippingFee == 0 ? '0,000' : formatQuantity(orderPrice.shippingFee)}
                </Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>
            <Divider className="my-2 bg-green-200 h-[1]" />

            <View className="flex-row justify-between">
              <Text className="font-hnow65medium text-lg">Khuyến mãi</Text>
              <View className="flex-row">
                <Text className="font-hnow64regular text-lg">
                  -{orderPrice.voucher == 0 ? '0,000' : formatQuantity(orderPrice.voucher)}
                </Text>
                <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
              </View>
            </View>

            <Divider className="my-4 bg-black-700 h-0.5 " />
          </View>
          <View className="flex-row justify-between" style={{ width: widthItem }}>
            <Text className="font-hnow65medium text-lg">Tổng cộng</Text>
            <View className="flex-row">
              <Text className="font-hnow64regular text-2xl text-primary">
                {formatQuantity(totalOrderPrice)}
              </Text>
              <Text className="font-hnow63book text-lg text-gray-400"> VNĐ</Text>
            </View>
          </View>
          <View className="mt-8" style={{ width: widthItem }}>
            <Button
              mode="elevated"
              textColor="white"
              buttonColor={Colors.cyan500}
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
              }}
              className="rounded-xl"
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
    </SafeAreaView>
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
