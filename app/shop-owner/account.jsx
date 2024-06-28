import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Appbar, Avatar, Button } from 'react-native-paper';
import { Colors } from '../../constant';
import { formatPhoneNumber } from '../../utils/MyUtils';

const Account = () => {
  const [name, setName] = useState('Tiệm ăn tháng năm');
  const [address, setAddress] = useState('Tòa S1.01 VinHome');
  const phone = '0372485543';
  const email = 'phuothv@gmail.com';

  const [isEdit, setIsEdit] = useState(false);

  const handleUpdate = () => {
    setIsEdit(!isEdit);
  };

  return (
    <View>
      {/* Header */}
      <Appbar.Header className="px-5">
        <MaterialIcons
          name="arrow-back-ios-new"
          size={36}
          color={Colors.primaryBackgroundColor}
          onPress={() => {
            router.push('/shop-owner/dashboard');
          }}
        />
        <Text className="font-bold text-xl pl-16">Cập nhật tài khoản</Text>
      </Appbar.Header>
      {/* Content */}
      <View className="flex-col mb-5 px-8">
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
          <Text className="text-2xl font-semibold text-primary">Tiệm ăn tháng năm</Text>
        </View>

        <View className="mt-5 justify-center">
          {/* Name */}
          {/* Label + Edit button */}
          <Text aria-label="Label for Username" nativeID="name" className="text-base">
            Tên
          </Text>

          {/* Input */}
          <TextInput
            editable={isEdit}
            aria-labelledby="name"
            value={name}
            onChangeText={(value) => setName(value)}
            className={`w-full pl-4 py-4 text-base font-psemibold rounded-2xl ${isEdit ? 'bg-white' : 'bg-green-50'}`}
          />

          {/* Adress */}
          {/* Label + Edit button */}
          <Text aria-label="Label for Address" nativeID="address" className="text-base mt-3">
            Địa chỉ
          </Text>
          {/* Input */}
          <TextInput
            editable={isEdit}
            aria-labelledby="address"
            value={address}
            onChangeText={(value) => setAddress(value)}
            className={`w-full pl-4 py-4 text-base font-psemibold rounded-2xl ${isEdit ? 'bg-white' : 'bg-green-50'}`}
          />

          {/* Phone */}
          {/* Label + Edit button */}
          <Text aria-label="Label for Phone" nativeID="phone" className="text-base mt-3">
            Số điện thoại
          </Text>
          {/* Input */}
          <TextInput
            editable={isEdit}
            aria-labelledby="phone"
            value={formatPhoneNumber(phone)}
            className={`w-full pl-4 py-4 text-base font-psemibold rounded-2xl bg-green-50`}
          />

          {/* Email */}
          {/* Label + Edit button */}
          <Text aria-label="Label for Username" nativeID="address" className="text-base mt-3">
            Email
          </Text>
          {/* Input */}
          <TextInput
            editable={false}
            aria-labelledby="address"
            value={email}
            className={`w-full pl-4 py-4 text-base font-psemibold rounded-2xl bg-green-50`}
          />
        </View>
      </View>

      {/* Button */}
      <View className="flex-row items-center justify-center px-8 pt-4">
        <Button
          buttonColor={Colors.primaryBackgroundColor}
          textColor={Colors.commonBtnText}
          mode="contained"
          style={{ width: '100%' }}
          contentStyle={{
            paddingVertical: 8,
          }}
          labelStyle={{
            fontFamily: 'HeadingNow-64Regular',
            fontSize: 16,
            lineHeight: 18,
          }}
          onPress={handleUpdate}
        >
          {isEdit ? 'Cập nhật' : 'Sửa thông tin'}
        </Button>
      </View>
    </View>
  );
};

export default Account;
