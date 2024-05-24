import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Colors } from '../../constant';

const ItemInGridSearch = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  console.log(item);
  const widthItem = parseInt((width * 26 / 100));
  console.log(widthItem);
  return (
    <View
      key={item.id}
      className={`flex justify-start items-center bg-transparent  rounded-2xl  mr-5 mb-10`}
      style={{
        width: widthItem
      }}
    >
      <View className={`w-full bg-black-100 flex-1 overflow-hidden rounded-2xl `} style={{
        height: widthItem
      }}>
        <View className="absolute top-2 left-2 bg-glass flex-row rounded-full p-1 z-[1] items-center">
          <Text className="font-hnow64regular" style={{ fontSize: 10 }}>
            4.5
          </Text>
          <AntDesign name="star" size={10} color={Colors.star.defaut} />
          <Text className="font-hnow64regular text-xs text-gray-500" style={{ fontSize: 10 }}>
            (25+)
          </Text>
        </View>

        <Image
          source={{
            uri: item.imageUrl,
          }}
          resizeMode="cover"
          className="w-full h-full z-[0]"
        />
      </View>
      <View className="pt-1 items-start w-full gap-1">
        <View className="flex  justify-center w-full items-start">
          <Text style className="text-xs text-gray-400 font-hnow64regular">
            {item.name}
          </Text>
        </View>
        <View className="flex-row">
          <Avatar.Image
            className="bg-transparent"
            size={16}
            source={{
              uri: item.shopLogoUrl,
            }}
          />
          <View className="ml-2 flex-wrap">
            <Text style={{ fontSize: 10 }} className=" font-hnow64regular">
              {item.shopName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemInGridSearch;
