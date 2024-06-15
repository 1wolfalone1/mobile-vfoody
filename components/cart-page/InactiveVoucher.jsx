import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constant';
import images from '../../constant/images';
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: Colors.shadow[400],

    shadowOpacity: 0.1,
    elevation: 10,
    // background color must be set
  },
  shadowSelected: {
    shadowOffset: { width: 8, height: 8 },
    shadowColor: Colors.shadow.DEFAULT,

    shadowOpacity: 0.1,

    elevation: 4,
    // background color must be set
  },
});
const InactiveVoucher = ({ item }) => {
  const [image, setImage] = useState('');
  const { width, height } = Dimensions.get('window');
  const widthImage = parseInt((width * 25) / 100);
  return (
    <View
      className="flex-row mb-4 justify-between"
      style={{
        height: widthImage,
        width: '100%',
        backgroundColor: 'white',
        ...styles.shadow,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <Image
        source={images.PromotionShopLogo}
        style={{
          height: widthImage,
          width: widthImage,
        }}
      />
      <View className="ml-2 flex-1 justify-between p-2">
        <Text numberOfLines={5} className="font-hnow63book">
          {item.title}
        </Text>
        <Text numberOfLines={2}>
          Áp dụng từ <Text className="text-primary">{item.startDate}</Text> đến{' '}
          <Text className="text-blue-500">{item.endDate}</Text>
        </Text>
      </View>
      <View className="items-center justify-center"></View>
    </View>
  );
};

export default InactiveVoucher;
