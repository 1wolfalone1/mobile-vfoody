import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { notification } from '../../data/Menu';
import { formatDate } from '../../utils/MyUtils';

const Item = ({ customerName, content, date }) => (
  <View className="px-5 py-3 my-2 mx-4 shadow-md shadow-black bg-white rounded-xl">
    <View className="flex justify-center">
      <View className="flex flew-row">
        <Text className="text-xl font-bold">
          {customerName}
          <Text className="font-mono">{` ${content}`}</Text>
        </Text>
      </View>
      <Text className="text-sm text-slate-500">{formatDate(date)}</Text>
    </View>
  </View>
);

export default function Notification() {
  const notificationItem = ({ item }) => (
    <Item customerName={item.customerName} content={item.content} date={item.date} />
  );

  return (
    <Provider>
      <FlatList
        data={notification}
        keyExtractor={(item) => item.id}
        renderItem={notificationItem}
      />
    </Provider>
  );
}
