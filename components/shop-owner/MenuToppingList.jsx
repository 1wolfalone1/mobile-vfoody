import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { toppings } from '../../data/Topping';

const MenuToppingList = () => {
  return (
    <View className="bg-white">
      <View className="flex-row items-center justify-between bg-gray-400 px-3 py-4 rounded-br-xl rounded-bl-xl">
        <Text className="font-semibold text-xl">Sốt</Text>
        <Text className="text-slate-200 text-sm">(nhiều lựa chọn)</Text>
      </View>

      <View className="justify-between bg-slate-100 ">
        {toppings.map((topping) => {
          return (
            <View className="flex-row justify-between px-3 py-3" key={topping.id}>
              <View className="flex-row items-center gap-3">
                <Image
                  source={{
                    uri: topping.images,
                  }}
                  //     style={{ width: 100, height: 100 }}
                  className="w-12 h-12 rounded-"
                />
                <Text>{topping.name}</Text>
              </View>

              <View className="items-center flex-row gap-1">
                <Text>{topping.price}</Text>
                <Text className="text-slate-400">đ</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MenuToppingList;
