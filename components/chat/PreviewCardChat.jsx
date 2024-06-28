import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
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
const PreviewCardChat = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  const widthImage = (width * 20) / 100;
  const widthItem = (width * 90) / 100;
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: 'white',
        ...styles.shadow
      }}
    >
      <TouchableRipple
        borderless
        onPress={() => router.push('/chat/' + item.channelId)}
        style={{
          borderRadius: 16,
        }}
      >
        <View className="flex-row "
        style={{
          width: widthItem,
          height: widthImage
        }} 
        >
          <Image
            source={{
              uri: item.logoUrl,
            }}
            style={{
              height: widthImage,
              width: widthImage,
              borderRadius: 16,
            }}
          />
          <View className=" pl-4 gap-2 pr-3 pt-2 flex-1">
            <View >
              <Text className="text-lg font-bold">
                {item.shopName}
              </Text>
            </View>
            <View className="flex-1 pr-2 flex-row">
              <Text numberOfLines={2} className="flex-wrap flex-1 text-xs text-gray-600 text-ellipsis">
                {item.text} asdfasdf asdfasdf asd fasd fads fasdf asd fasdf asdf asdf asdf asdf as dfasd fkasd fasd fasdf 
                asfd asd fadsf asfd  asd fasd fas
              </Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default PreviewCardChat;
