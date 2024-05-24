import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constant';
import { formatNumberVND } from '../../utils/MyUtils';
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.shadow[300],

    shadowOpacity: 0.2,
    elevation: 5,
    // background color must be set
  },
});

const ItemBodyInSearchList = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  console.log(item);
  const widthItem = parseInt((width * 23) / 100);
  return (
    <View
      className="flex flex-1 overflow-visible"
      style={{
        width: widthItem,
      }}
    >
      <View className="rounded-lg " style={{
        ...styles.shadow,
        width: widthItem,
        height: widthItem
      }}>
        <Image source={{ uri: item.imageUrl }} className="w-full h-full rounded-lg" />
      </View>
      <View>
        <Text className="text-lg text-primary">{formatNumberVND(item.price)}</Text>
        <Text className="text-black text-xs font-hnow63book">{item.name}</Text>
      </View>
    </View>
  );
};

export default ItemBodyInSearchList;
