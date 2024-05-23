import { router } from 'expo-router';
import { ShoppingBasket } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Badge, Divider, TouchableRipple } from 'react-native-paper';
import { Colors } from '../../constant';

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: Colors.shadow[300],

    shadowOpacity: 0.3,
    elevation: 4,
    // background color must be set
  },
  shadowSelected: {
    shadowOffset: { width: 8, height: 8 },
    shadowColor: Colors.shadow.DEFAULT,

    shadowOpacity: 0.6,

    elevation: 20,
    // background color must be set
  },
});
const ShopItem = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  const widthImage = parseInt((width * 30) / 100);
  return (
    <TouchableRipple onPress={() => router.push('/cart/shipId')} rippleColor="rgba(255, 255, 255, 0)" >
      <View
        className="flex-row rounded-3xl bg-white m-2"
        style={{ height: widthImage, ...styles.shadow }}
      >
        <View style={{ height: widthImage, width: widthImage }}>
          <Image
            className="w-full h-full rounded-3xl"
            source={{
              uri: item.background_link,
            }}
          />
        </View>
        <View className="p-3 flex-1 justify-between">
          <View className="mb-2">
            <Text className="font-hnow65medium text-sm">{item.name}</Text>
          </View>
          <View className="mt-1 flex-row items-center justify-between">
            <Text>Toa s705 (0.2km)</Text>
            <Divider horizontalInset style={{ width: 1, height: '100%' }} />
            <Text className="text-primary">Freeship</Text>
          </View>
          <View className="mt-3 flex-row justify-between">
            <View className="flex-row">
              <Text className="font-hnow65medium mr-3">Total: </Text>
              <Text className="text-primary font-hnow64regular">38.000đ</Text>
            </View>
            <View>
              <Badge className="absolute right-[-5] top-[-4] z-1000 bg-primary" size={16}>
                2
              </Badge>
              <ShoppingBasket color={'black'} size={23} className="z-1" style={{ zIndex: -1 }} />
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default ShopItem;
