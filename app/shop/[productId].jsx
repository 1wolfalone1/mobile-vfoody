import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ToppingItem from '../../components/shop/ToppingItem';
import { Colors } from '../../constant';
import colors from '../../constant/colors';
import { dataShopDetailsSelector, getProductDetailsById } from '../../redux/slice/shopDetailsSlice';
import { formatNumberVND } from '../../utils/MyUtils';

const ProductDetail = () => {
  const { productId } = useLocalSearchParams();
  const { product } = useSelector(dataShopDetailsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetailsById(productId));
    return () => {};
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [toppingChecked, setToppingChecked] = useState(null);
  const [sauceChecked, setSauceChecked] = useState(null);

  const handleAddLike = () => {
    setIsLiked(!isLiked);
  };
  console.log(product, ' product detials in selector');
  const [totalOrder, setTotalOrder] = useState(product.total_order || 0);

  const handleDecrease = () => {
    if (totalOrder > 0) {
      setTotalOrder((prevTotalOrder) => Math.max(prevTotalOrder - 1, 0));
    }
  };

  const handleIncrease = () => {
    setTotalOrder((prevTotalOrder) => prevTotalOrder + 1);
  };

  return (
    <SafeAreaView className="flex-1">
      {product.info == null ? (
        <SkeletonItem />
      ) : (
        <View className="flex-1">
          <ScrollView className="">
            <View className="flex-1 mx-8 mb-12">
              <Image
                className="h-48 rounded-lg"
                resizeMode="cover"
                source={{ uri: `${product.info.imageUrl}` }}
              />
              <View className="flex-row justify-between items-center flex-shrink: 0">
                <Text className="text-3xl font-bold mt-4">{product.info.name}</Text>
                <TouchableRipple
                  key={product.info.id}
                  onPress={() => handleAddLike()}
                  rippleColor={colors.primaryTextColor}
                >
                  <View>
                    {isLiked ? (
                      <AntDesign name="heart" size={24} color="red" />
                    ) : (
                      <AntDesign name="hearto" size={24} color="black" />
                    )}
                  </View>
                </TouchableRipple>
              </View>
              <View className="flex-row items-center my-1">
                <AntDesign name="star" size={24} style={{ color: '#FFC529' }} />
                <Text className="font-bold ml-1">4.5</Text>
                <Button
                  labelStyle={{
                    color: Colors.btnText,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => router.push('/review')}
                >
                  Đánh giá
                </Button>
              </View>

              <View className="flex-row justify-between">
                <Text
                  style={{ color: colors.primaryBackgroundColor }}
                  className="font-hnow64regular text-xl"
                >
                  {formatNumberVND(product.info.price)}
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={handleDecrease}>
                    <Feather name="minus-circle" size={30} color={colors.primaryBackgroundColor} />
                  </TouchableOpacity>
                  <Text className="font-bold mx-2 text-lg">{totalOrder}</Text>
                  <TouchableOpacity onPress={handleIncrease}>
                    <Ionicons name="add-circle" size={32} color={colors.primaryBackgroundColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-gray-500 my-4">{product.info.description}</Text>

              <View className="flex-1">
                {product.topping.map((item, index) => (
                  <ToppingItem topping={item} />
                ))}
              </View>
            </View>
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
              icon="shopping"
              onPress={() => router.push('/cart')}
            >
              Thêm vào giỏ hàng
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
const SkeletonItem = () => {
  return <View></View>;
};
