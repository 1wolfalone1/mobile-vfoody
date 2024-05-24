import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Colors } from '../../constant';
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 8 },
    shadowColor: Colors.shadow[300],

    shadowOpacity: 0.1,
    elevation: 6,
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

const ItemShopRegulerInHome = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  console.log(item);
  const widthItem = parseInt((width * 65) / 100);
  const heightImage = parseInt((widthItem * 65) / 100);
  
  console.log(widthItem);
  return (
    <View
      key={item.id}
      className={`flex justify-start items-center bg-white rounded-2xl  mr-5 mb-10`}
      style={{
        ...styles.shadow,
        width: widthItem,
      }}
    >
      <View
        className="w-full bg-black-100 flex-1 overflow-hidden rounded-t-2xl "
        style={{
          height: heightImage,
        }}
      >
        <View className="absolute top-2 left-2 bg-glass flex-row rounded-full p-1.5 z-[1]">
          <Text className="font-hnow64regular text-xs ">{item.rating}</Text>
          <AntDesign name="star" size={14} color={Colors.star.defaut} />
          <Text className="font-hnow64regular text-xs text-gray-700">(25+)</Text>
        </View>
        <View className="rounded-full bg-primary absolute right-2 top-2 w-23 p-1.5 z-[1]">
          <AntDesign name="heart" size={18} color="white" />
        </View>
        <Image
          source={{
            uri: item.bannerUrl,
          }}
          resizeMode="cover"
          className="w-full h-full z-[0]"
        />
      </View>
      <View className="p-3 items-start w-full gap-1">
        <View className="flex-row">
          <Avatar.Image
            className="bg-transparent"
            size={24}
            source={{
              uri: item.logoUrl,
            }}
          />
          <View className="ml-2">
            <Text className="text-sm font-hnow65medium">Cơm nhà làm</Text>
            <Text style className="text-xs text-gray-600 font-hnow64regular">
             {item.description} 
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2 justify-between w-full items-center">
          <Text className="text-xs font-hnow65medium text-primary">12k -> 30k</Text>
          <Text style className="text-xs text-gray-400 font-hnow64regular">
           {item.buildingName} 
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemShopRegulerInHome;