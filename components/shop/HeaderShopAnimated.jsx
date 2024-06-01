import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
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
          className="rounded-xl absolute bottom-0 bg-transparent left-8"
          size={80}
          source={{
            uri: shopInfo.logoUrl,
            zIndex: 10,
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
              style={{ height: 55 }}
            />
          </ScrollView>
        ) : (
          <View className="flex h-[55]">
            <View className="flex-row gap-10">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-hnow64regular items-center ">{shopInfo.rating}</Text>
                <AntDesign name="star" size={16} color={Colors.star.defaut} />
                <Text className="font-hnow63book text-gray-600 text-xs">
                  ({shopInfo.totalProduct}+)
                </Text>
              </View>
              <View className="flex-row gap-1 items-center">
                <MapPin color={'blue'} size={16} />
                <Text className="font-hnow64regular text-gray-700 text-xs">
                  {shopInfo.building.name}
                </Text>
              </View>
            </View>
            <View className="flex-row mt-4 justify-between">
              <View className="flex-row gap-1 items-center">
                <FontAwesome5
                  name="shipping-fast"
                  size={16}
                  color={Colors.primaryBackgroundColor}
                />
                <Text className="text-xs text-gray-700 font-hnow63book">
                  Shipping Fee {shopInfo.shippingFee}k
                </Text>
              </View>
              <View className="flex-row gap-1 items-center">
                <MaterialIcons name="schedule" size={16} color="green" />
                <Text className="font-hnow63book text-gray-700 text-xs">
                  {shopInfo.activeFrom}h
                </Text>
                <AntDesign name="arrowright" size={16} color={Colors.greyText} />
                <Text className="font-hnow63book text-gray-700 text-xs">{shopInfo.activeTo}h</Text>
              </View>
              <View className="flex-row gap-1">
                <Ionicons name="receipt" size={16} color="#660155" />
                <Text className="font-hnow63book text-gray-700 text-xs">150 đơn đã bán</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
export default HeaderShopAnimated;

const SkeletonItem = () => {
  return <View></View>;
};
