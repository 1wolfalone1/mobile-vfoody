import React from 'react';
import { FlatList } from 'react-native';
import ItemAllProductInShop from './ItemAllProductInShop';

const ListAllProductsInShop = ({ data }) => {
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ paddingHorizontal: 28, justifyContent: 'center', flex: 1, backfaceVisibility: "black" }}
       columnWrapperStyle={{ justifyContent: "space-between"}}
       scrollEnabled={false}
      numColumns={2}

      renderItem={({ item }) => <ItemAllProductInShop item={item} />}
    />
  );
};

export default ListAllProductsInShop;
