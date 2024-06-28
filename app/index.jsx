import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Colors, Icons, Images } from '../constant';
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function StartPage() {
  return (
    <View style={styles.container}>
      <Image
        className="absolute top-20 left-0 right-0 bottom-0 h-5/6 object-cover"
        resizeMode="stretch"
        source={Images.LogoCover}
      />
      <FadeInView className="w-full justify-center items-center">
        <View className="justify-center items-center mb-20">
          <Image className="w-52 h-52" resizeMode="contain" source={Icons.IconLight} />
          <Text className="text-3xl font-bold text-white">VFoody</Text>
        </View>
        <Button
          mode="contained-tonal"
          textColor={Colors.btnText}
          contentStyle={{
            paddingVertical: 8,
            width: '100%',
            backgroundColor: 'white'
          }}
          labelStyle={{
            fontSize: 24,
            lineHeight: 27,
          }}
          onPress={() => router.push('/shop-owner/order')}
        >
          Bắt đầu
        </Button>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.primaryBackgroundColor,
    paddingHorizontal: 1,
    gap: 60,
  },
});
