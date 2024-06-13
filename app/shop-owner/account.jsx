import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Appbar, Avatar, Button } from 'react-native-paper';
import { Pencil } from 'lucide-react-native';
import { Colors } from '../../constant';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Account = () => {
  const [editName, setEditName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [name, setName] = useState('Tiệm ăn tháng năm');
  const [address, setAddress] = useState('Tòa S1.01 VinHome');
  const [phone, setPhone] = useState('(676) 599-1946');
  const [email, setEmail] = useState('hucnom@wur.mo');

  const toggleEditName = () => {
    setEditName(!editName);
  };
  const toggleEditAddress = () => {
    setEditAddress(!editAddress);
  };

  return (
    <View>
      {/* Header */}
      <Appbar.Header>
        <MaterialIcons
          name="arrow-back-ios-new"
          size={36}
          color={Colors.primaryBackgroundColor}
          onPress={() => {
            router.push('/shop-owner/dashboard');
          }}
        />
        <Text className="font-bold text-xl pl-16">Tạo mới sản phẩm</Text>
      </Appbar.Header>
      {/* Content */}
      <View className="flex-col mb-5 px-5">
        {/* Avatar */}
        <View className="flex-col items-center gap-2 py-3">
          <Avatar.Image
            size={100}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/64c9/abd5/14946a5ee5d33c50da9e1a5a6fb5beee?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bej~A4eILOz7WAdK1EFAnQ6PkmMFYSjPCcZEA-fZi5w~ggg6yr48hvZELMtwvEulcYjmgS7ZYsJWQhlL481zGJM7FnnPDEGp1et942WwDxdoB7KjzI~8F89kATVYF6kLKdosd5bUa2olmq3MFntFHBgcnVwNHFAssO1~7RfeSrTHelgAEZK2LnYqcURRx5-m5THD9Zbxl-IFkUxqjvPKCNGKIhCM8MOqf0qko4XizUv2teZrYwBB0oMno63p7fFWJWP~h~yki7rw956cbWn-ScuEfts0ZJvL6pTs8Wj~S5vtGWacf26xyDhFkcDEO8Ils-RcSNmwImbm-0msD8nxeQ__',
            }}
          />

          <Text className="text-primary underline">Thay đổi</Text>
        </View>

        {/* Title */}
        <View className="flex-row justify-center py-3">
          <Text className="text-xl font-semibold text-primary">Tiệm ăn tháng năm</Text>
        </View>

        <View className="mt-5 gap-2 justify-center">
          {/* Name */}
          <View className="gap-2">
            {/* Label + Edit button */}
            <View className="flex-row items-center justify-between">
              <Text
                aria-label="Label for Username"
                nativeID="name"
                className="font-semibold text-lg"
              >
                Tên
              </Text>
              <Pencil color={Colors.primaryBackgroundColor} size={20} onPress={toggleEditName} />
            </View>

            {/* Input */}
            <TextInput
              editable={editName}
              aria-labelledby="name"
              value={name}
              className={`w-full px-3 py-3 text-[15px] rounded-2xl ${editName ? 'bg-white' : 'bg-green-50'}`}
            />
          </View>

          {/* Adress */}
          <View className="gap-2">
            {/* Label + Edit button */}
            <View className="flex-row items-center justify-between">
              <Text
                aria-label="Label for Username"
                nativeID="name"
                className="font-semibold text-lg"
              >
                Địa chỉ
              </Text>
              <Pencil color={Colors.primaryBackgroundColor} size={20} onPress={toggleEditAddress} />
            </View>
            {/* Input */}
            <TextInput
              editable={editAddress}
              aria-labelledby="name"
              value={address}
              className={`w-full px-3 py-3 text-[15px] rounded-2xl ${editAddress ? 'bg-white' : 'bg-green-50'}`}
            />
          </View>

          {/* Phone */}
          <View className="gap-2">
            {/* Label + Edit button */}
            <View className="flex-row items-center justify-between">
              <Text
                aria-label="Label for Username"
                nativeID="phone"
                className="font-semibold text-lg"
              >
                Số điện thoại
              </Text>
            </View>
            {/* Input */}
            <TextInput
              editable={false}
              aria-labelledby="phone"
              value={phone}
              className={`w-full px-3 py-3 text-[15px] rounded-2xl bg-green-50`}
            />
          </View>

          {/* Email */}
          <View className="gap-2">
            {/* Label + Edit button */}
            <View className="flex-row items-center justify-between">
              <Text
                aria-label="Label for Username"
                nativeID="address"
                className="font-semibold text-lg"
              >
                Email
              </Text>
            </View>
            {/* Input */}
            <TextInput
              editable={false}
              aria-labelledby="address"
              value={email}
              className={`w-full px-3 py-3 text-[15px] rounded-2xl bg-green-50`}
            />
          </View>
        </View>
      </View>

      {/* Button */}
      <View className="flex-row items-center justify-center px-5 ml-10">
        <Button
          mode="contained"
          buttonColor={Colors.primaryBackgroundColor}
          style={{ paddingHorizontal: 8 }}
          className="mt-3 flex-row justify-center  items-center w-full"
        >
          Lưu
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Account;
