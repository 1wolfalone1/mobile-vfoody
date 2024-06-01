import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from '../../constant';
import { formatNumberVND } from '../../utils/MyUtils';

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 8 },
    shadowColor: Colors.shadow[100],

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
const ItemBestProctInShop = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  const widthItem = parseInt((width * 30) / 100);

  return item == null ? (
    <SkeletonItem />
  ) : (
    <View
      className="flex-row my-4 p-2"
      style={{ borderRadius: 20, backgroundColor: 'white', ...styles.shadow }}
    >
      <Image
        style={{ height: widthItem, width: widthItem, borderRadius: 20 }}
        source={{
          uri: item.imageUrl,
        }}
      />
      <View className="pl-2">
        <View>
          <Text className="font-hnow65medium text-lg">{item.name}</Text>
        </View>
        <View>
          <Text className="font-hnow64regular text-gray-500">{item.description}</Text>
        </View>
        <View className="flex-1 justify-between items-end flex-row">
          <Text className="text-primary text-lg">{formatNumberVND(item.price)}</Text>
          <IconButton
            icon={'plus'}
            size={20}
            onPress={() => {}}
            iconColor='red'
            mode='contained'
            style={{
              margin: 0, 
              shadowColor: 'rgba(1, 0, 0, 1)',
              shadowOpacity: 0.8,
              elevation: 6,
              shadowRadius: 25,
              shadowOffset: { width: 1, height: 13 },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ItemBestProctInShop;
