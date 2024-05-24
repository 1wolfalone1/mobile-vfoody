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
      duration: 1500,
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
        className="absolute top-0 left-0 right-0 bottom-0 h-screen"
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={Images.LogoCover}
      />
      <FadeInView style={styles.animation}>
        <View style={styles.main}>
          <Image style={styles.logo} resizeMode="contain" source={Icons.IconLight} />
          <Text style={styles.title}>VFoody</Text>
        </View>
        <Button
          mode="elevated"
          textColor="red"
          buttonColor="white"
          theme={{ roundness: 4 }}
          contentStyle={{
            paddingVertical: 8,
            width: '100%',
          }}
          labelStyle={{
            fontFamily: 'HeadingNow-64Regular',
            fontSize: 24,
            lineHeight: 27,
          }}
          onPress={() => router.push('/sign-in')}
        >
          Bắt đầu
        </Button>
        <Text></Text>
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
  main: {
    alignItems: 'center',
    marginBottom: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: Colors.primaryTextColor,
  },
  button: {
    paddingVertical: 20,
    backgroundColor: Colors.secondaryBackgroundColor,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  backgroundImage: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    height: '95%',
  },
  animation: {
    width: '100%',
    height: 60,
    flex: 1,
    gap: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
