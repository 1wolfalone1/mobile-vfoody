import React from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

const CustomDrawer = ({ children, open, onClose, onOpen, renderDrawerContent }) => {
  return (
    <View className="flex-1">
      <Drawer
        drawerType="slide"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        renderDrawerContent={renderDrawerContent}
      >
        {children}
      </Drawer>
    </View>
  );
};

export default CustomDrawer;
