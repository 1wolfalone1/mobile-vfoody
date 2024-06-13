import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constant';
import { Menu } from 'lucide-react-native';

const DashboardHeader = ({ setOpenDrawerDashboard, centerContent, rightContent }) => {
  return (
    <View className="flex-row items-center justify-between py-2 px-5">
      <Menu
        size={36}
        color={Colors.primaryBackgroundColor}
        onPress={() => setOpenDrawerDashboard((prevOpen) => !prevOpen)}
      />
      {centerContent}
      {rightContent ? rightContent : <View></View>}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DashboardHeader;
