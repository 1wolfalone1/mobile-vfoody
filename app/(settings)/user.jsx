import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { userInfoSliceSelector } from '../../redux/slice/userSlice';

const UserProfile = () => {
  const userInfo = useSelector(userInfoSliceSelector);
  console.log(userInfo, 'user info');
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>UserProfile</Text>
    </SafeAreaView>
  );
};

export default UserProfile;
