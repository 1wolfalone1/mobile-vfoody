import { AntDesign } from '@expo/vector-icons';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { Animated, Image, ScrollView, Text, View } from 'react-native';
import { Avatar, IconButton, Searchbar } from 'react-native-paper';
import { Colors } from '../../constant';

const Header_Max_Height = 252;
const Header_Min_Height = 0;

const HeaderShopAnimated = ({
  shopInfo,
  heightHeaderSticky,
  image_url,
  shopName,
  animHeaderValue,
  setIsHeaderTop,
  isHeaderTop,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [1, 0],
    extrapolate: 'extend',
  });
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  return shopInfo == null ? (
    <SkeletonItem />
  ) : (
    <Animated.View className="px-8" style={{ zIndex: -1 }}>
      <Animated.View
        style={[
          {
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
            opacity: animateHeaderBackgroundColor,
            overflow: 'hidden',
            marginTop: 12,
          },
        ]}
      >
        <Image
          className=" rounded-xl"
          resizeMode="cover"
          source={{ uri: shopInfo.bannerUrl }}
          style={{ height: 240 }}
        />
        <Avatar.Image
          source={{
            uri: shopInfo.logoUrl,
          }}
        />
      </Animated.View>
      <View>
        {!isHeaderTop && (
          <View className="mt-0 flex-row justify-between items-center">
            <Text className="font-hnow65medium text-2xl">{shopInfo.name}</Text>
            {isSearchOpen ? (
              <IconButton
                icon="magnify-remove-outline"
                iconColor={Colors.primaryBackgroundColor}
                size={24}
                onPress={() => setIsSearchOpen(false)}
              />
            ) : (
              <IconButton
                icon="magnify"
                iconColor={Colors.primaryBackgroundColor}
                size={24}
                onPress={() => setIsSearchOpen(true)}
              />
            )}
          </View>
        )}
        {isSearchOpen ? (
          <ScrollView>
            {isHeaderTop && <View style={{ height: heightHeaderSticky }} />}
            <Searchbar
              onIconPress={() => {}}
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </ScrollView>
        ) : (
          <View className="flex-row gap-10">
            <View className="flex-row items-center gap-1">
              <Text className="text-xs font-hnow64regular items-center ">4.0</Text>
              <AntDesign name="star" size={16} color={Colors.star.defaut} />
              <Text className="font-hnow63book text-gray-600 text-xs">(30+)</Text>
            </View>
            <View className="flex-row gap-1 items-center">
              <MapPin color={Colors.greyText} size={16}/>
              <Text className="font-hnow64regular text-gray-700 text-xs">{shopInfo.building.name}</Text>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
export default HeaderShopAnimated;

const SkeletonItem = () => {
  return (
    <View></View>
  );
};
