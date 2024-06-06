import { ArrowUp, HandCoins, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

const DashboardCard = ({ mainIcon, title, subTitle, leftIcon, leftText }) => {
  return (
    <View className="items-center mt-5 px-3">
      <Card.Title
        titleStyle={{ fontSize: 22, fontWeight: 'bold' }}
        subtitleStyle={{ fontSize: 12 }}
        title={title}
        subtitle={subTitle}
        left={(props) => (
          <View className="bg-[#d9f3ea] w-14 h-14 rounded-full justify-center items-center p-3">
            {mainIcon}
          </View>
        )}
        leftStyle={{ marginRight: 30 }}
        right={() => (
          <View className="flex-row gap-1 items-center">
            {leftIcon}
            <Text className="text-sm text-slate-500">{leftText}</Text>
          </View>
        )}
        className="rounded-xl bg-white px-3"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DashboardCard;
