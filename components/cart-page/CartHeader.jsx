import { router } from 'expo-router';
import SkeletonLoading from 'expo-skeleton-loading';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { Colors } from '../../constant';

const CartHeader = ({ info }) => {
  console.log(info, ' info shop in cart header');
  return !(info && info.id) ? (
    <SkeletonItem />
  ) : (
    <View className="gap-2 items-center">
      <IconButton
        icon="chevron-left"
        iconColor={Colors.primaryBackgroundColor}
        size={40}
        theme={{ padding: 5 }}
        onPress={() => router.back()}
        className="p-0 m-0 absolute left-1"
        style={{ borderRadius: 16, alignSelf: 'center' }}
      />

      <View className="flex-row items-center">
        <Avatar.Image
          className="bg-transparent"
          size={24}
          source={{
            uri: info?.logoUrl,
          }}
        />
        <Text className="ml-2 text-2xl font-hnow65medium">{info?.name}</Text>
      </View>
      <View className="flex-row items-center">
        <MapPin color={Colors.greyText} size={20} />
        <Text className="ml-1 text-gray-600">{info?.building.name}</Text>
      </View>
    </View>
  );
};

export default CartHeader;

const SkeletonItem = () => {
  return (
    <SkeletonLoading background={Colors.skeleton.bg} highlight={Colors.skeleton.hl}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <IconButton
          icon="chevron-left"
          iconColor={Colors.primaryBackgroundColor}
          size={40}
          theme={{ padding: 5 }}
          onPress={() => router.back()}
          className="p-0 m-0 absolute left-1"
          style={{ borderRadius: 16, alignSelf: 'center' }}
        />
        <View
          style={{
            height: 30,
            width: 200,
            backgroundColor: Colors.skeleton.bg,
            borderRadius: 16,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            height: 16,
            width: 300,
            backgroundColor: Colors.skeleton.bg,
            borderRadius: 16,
          }}
        />
      </View>
    </SkeletonLoading>
  );
};
