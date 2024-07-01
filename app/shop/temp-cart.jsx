import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ItemInCart from '../../components/cart-page/ItemInCart';
import { Colors } from '../../constant';
import images from '../../constant/images';
import cartSlice, { cartSelector, getCartInfo } from '../../redux/slice/cartSlice';
import { dataShopDetailsSelector } from '../../redux/slice/shopDetailsSlice';

const TempCartPage = () => {
  const { listItemInfo, items } = useSelector(cartSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const dispatch = useDispatch();

  console.log(listItemInfo, items, ' asdfasfasfasfasdf');
  useEffect(() => {
    if (!info || !listItemInfo) {
      router.push('/home');
      return () => {
        dispatch(shopDetailsSlice.actions.resetProductDetails());
      };
    }
    console.log(listItemInfo, 'adsfasdf');
    if (info && info.id) {
      console.log(' is herrrrrrrrrrrrrrrrrrrrr', info.id, items);
      dispatch(getCartInfo(info?.id));
    }
    return () => {
      dispatch(cartSlice.actions.resetStateListItemInfo());
    };
  }, []);

  const handleClearCart = () => {
    dispatch(cartSlice.actions.clearCart(info?.id));
  };
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
            onPress={() => handleClearCart()}
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
          paddingBottom: 20,
        }}
      >
        {items[info?.id] && items[info?.id].length > 0 ? (
          items[info?.id]?.map((item) => (
            <ItemInCart key={item ? item.productId : null} itemsInfo={item} shopId={info.id} />
          ))
        ) : (
          <Image
            style={{
              width: '100%',
              flex: 1,
            }}
            resizeMode="contain"
            source={images.EmptyCart}
          />
        )}
      </ScrollView>
      <View className="flex mb-4 w-full items-center absolute bottom-0">
        <Button
          textColor="white"
          mode="elevated"
          buttonColor={Colors.primaryBackgroundColor}
          className="rounded-full items-center"
          labelStyle={{
            padding: 2,
          }}
          contentStyle={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}
          onPress={() => {
           
            router.push('/cart/' + info?.id);
          }}
        >
          Đặt hàng ngay
        </Button>
      </View>
    </View>
  );
};

export default TempCartPage;
