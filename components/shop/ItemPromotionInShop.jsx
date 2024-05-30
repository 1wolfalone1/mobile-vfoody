import React from 'react';
import { Text, View } from 'react-native';

const ItemPromotionInShop = ({}) => {
  return item == null ? (
    <SkeletonItem />
  ) : (
    <View>
      <Text>ItemPromotionInShop</Text>
    </View>
  );
};

export default ItemPromotionInShop;

const SkeletonItem = () => {};
