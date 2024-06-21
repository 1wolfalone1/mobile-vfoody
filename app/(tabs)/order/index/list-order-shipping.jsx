import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Button onPress={() => router.push('/order/1243')}>test</Button>
    </View>
  );
};

export default index;
