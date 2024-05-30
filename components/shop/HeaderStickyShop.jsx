import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from '../../constant';

const HeaderStickyShop = ({ isHeaderTop, shopName, heightHeaderSticky }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View
      className="flex-row items-center justify-between absolute top-0  z-1000 mt-8"
      style={{ width: width, height: heightHeaderSticky }}
    >
      <View className="flex-row items-center" style={{ width: (width * 70) / 100 }}>
        <IconButton
          icon="chevron-left"
          mode="contained-tonal"
          iconColor={Colors.primaryBackgroundColor}
          containerColor={!isHeaderTop ? Colors.glassShopHeader : 'transparent'}
          size={40}
          theme={{ padding: 5 }}
          onPress={() => router.back()}
          className="p-0"
          style={{ borderRadius: 16 }}
        />
        <View>
          {isHeaderTop && (
            <Text numberOfLines={2} className="font-hnow65medium text-2xl text-ellipsis">
              {shopName}
            </Text>
          )}
        </View>
      </View>
      <View className="flex-row">
        <IconButton
          icon="share-variant"
          iconColor={Colors.btnBackground}
          containerColor={Colors.primaryBackgroundColor}
          size={16}
          onPress={() => router.back()}
        />
        <IconButton
          icon="heart"
          iconColor={Colors.btnBackground}
          containerColor={Colors.primaryBackgroundColor}
          size={16}
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
};

export default HeaderStickyShop;
