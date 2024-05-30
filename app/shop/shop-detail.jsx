import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderStickyShop from '../../components/shop/HeaderStickyShop';

const ShopDetail = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <HeaderStickyShop />
      </View>
    </SafeAreaView>
  );
};

export default ShopDetail;
