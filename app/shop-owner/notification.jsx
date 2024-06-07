import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationList from '../../components/shop-owner/Notification'

const Notification = () => {
  return (
    <View className="flex-1">
      <Text className='text-center text-2xl my-4 font-semibold'>Notification</Text>
      <NotificationList />
    </View>
  );
}

export default Notification

const styles = StyleSheet.create({})