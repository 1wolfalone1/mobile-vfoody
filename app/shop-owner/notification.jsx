import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationList from '../../components/shop-owner/Notification'

const Notification = () => {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Thông báo đơn hàng mới
      </Text>
      <NotificationList />
    </View>
  );
}

export default Notification

const styles = StyleSheet.create({})