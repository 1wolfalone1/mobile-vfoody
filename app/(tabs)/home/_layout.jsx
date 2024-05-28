import { Slot } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicHeader from '../../../components/user-page/HeaderAnimated';
const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    paddingBottom: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
});
const HomePage = () => {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container} className="bg-white" edges={['top', 'right', 'left']}>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}
      >
        <Slot screenOptions={{}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
