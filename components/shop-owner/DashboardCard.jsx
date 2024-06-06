import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';

const DashboardCard = ({ mainIcon, title, subTitle, leftIcon, leftText }) => {
  return (
    <View className="items-center mt-5 px-3">
      <Card.Title
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        subtitleStyle={{ fontSize: 16 }}
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

export default DashboardCard;
