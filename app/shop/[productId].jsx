import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constant';
import colors from '../../constant/colors';

const ProductDetail = () => {
  const product = {
    id: 'banhmi01',
    name: 'Bánh mì',
    description: 'Bánh mì với lớp vỏ ngoài giòn tan, ruột mềm, còn bên trong là phần nhân',
    price: '20000',
    image_url:
      'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-16//1710602210-1710445729-picture-1-1710445636-793-width1200height900-width1200height900.jpg',
    total_order: 2,
    status: 'active',
    shop_id: 'shop01',
  };

  const shop = {
    id: 'shop01',
    name: 'Quán bánh mì bà 5',
    address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM',
    star: 4.5,
    quantity: 35,
  };

  const topping = [
    {
      image_url:
        'https://www.vinmec.com/s3-images/20210527_164418_392660_an-ot-cay.max-800x800.jpg',
      name: 'Ớt',
      price: '2000',
    },
    {
      image_url: 'https://bepxua.vn/wp-content/uploads/2022/12/cach-lam-do-chua-7.jpg',
      name: 'Đồ chua',
      price: '3000',
    },
    {
      image_url:
        'https://onlineculinaryschool.net/wp-content/uploads/2018/11/online_culinary_school_chicken_liver_pate-1.jpg',
      name: 'Pate',
      price: '2000',
    },
  ];

  const [isLiked, setIsLiked] = useState(false);
  const [toppingChecked, setToppingChecked] = useState(null);
  const [sauceChecked, setSauceChecked] = useState(null);

  const handleAddLike = () => {
    setIsLiked(!isLiked);
  };

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
      <View className="flex-1">
        <ScrollView className="">
          <View className="flex-1 mx-8 mb-12">
            <Image
              className="h-48 rounded-lg"
              resizeMode="cover"
              source={{ uri: `${product.image_url}` }}
            />
            <View className="flex-row justify-between items-center flex-shrink: 0">
              <Text className="text-3xl font-bold mt-4">{product.name}</Text>
              <TouchableRipple
                key={product.id}
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
              <Text className="font-bold ml-1">{shop.star}</Text>
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
              <Text style={{ color: colors.primaryBackgroundColor }} className="font-bold text-xl">
                {product.price}đ
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
            <Text className="text-gray-500 my-4">{product.description}</Text>

            <View className="flex-1">
              <View className="flex gap-2 mb-2">
                <Text className="text-base font-bold">Topping nhân</Text>
                {topping.map((item, index) => (
                  <View className="flex flex-row justify-between items-center" key={index}>
                    <View className="flex flex-row items-center">
                      <Image source={{ uri: `${item.image_url}` }} className="w-8 h-8" />
                      <Text className="ml-2">{item.name}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text>{item.price}đ</Text>
                      <RadioButton
                        value={item.name}
                        status={toppingChecked === item.name ? 'checked' : 'unchecked'}
                        color={colors.primaryBackgroundColor}
                        onPress={() => setToppingChecked(item.name)}
                      />
                    </View>
                  </View>
                ))}
              </View>

              <View className="flex gap-2 mb-2">
                <Text className="text-base font-bold">Sốt</Text>
                {topping.map((item, index) => (
                  <View className="flex flex-row justify-between items-center" key={index}>
                    <View className="flex flex-row items-center">
                      <Image source={{ uri: `${item.image_url}` }} className="w-8 h-8" />
                      <Text className="ml-2">{item.name}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text>{item.price}đ</Text>
                      <RadioButton
                        value={item.name}
                        status={sauceChecked === item.name ? 'checked' : 'unchecked'}
                        color={colors.primaryBackgroundColor}
                        onPress={() => setSauceChecked(item.name)}
                      />
                    </View>
                  </View>
                ))}
              </View>

              <View className="flex gap-2 mb-2">
                <Text className="text-base font-bold">Sốt</Text>
                {topping.map((item, index) => (
                  <View className="flex flex-row justify-between items-center" key={index}>
                    <View className="flex flex-row items-center">
                      <Image source={{ uri: `${item.image_url}` }} className="w-8 h-8" />
                      <Text className="ml-2">{item.name}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text>{item.price}đ</Text>
                      <RadioButton
                        value={item.name}
                        status={sauceChecked === item.name ? 'checked' : 'unchecked'}
                        color={colors.primaryBackgroundColor}
                        onPress={() => setSauceChecked(item.name)}
                      />
                    </View>
                  </View>
                ))}
              </View>
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
    </SafeAreaView>
  );
};

export default ProductDetail;
