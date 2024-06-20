import { router, useFocusEffect } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import MaterialTopBar from '../../../components/custom-stack/MaterialTopBar';
import { Colors, Icons } from '../../../constant';
import globalSlice from '../../../redux/slice/globalSlice';

const OrderLayout = () => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState([
    {
      latitude: 10.8387911,
      longitude: 106.8347649,
      name: 'Vinhome Grand Park',
    },
  ]);
  useFocusEffect(() => {
    dispatch(globalSlice.actions.changePositionTabBar(400));
    return () => {
      dispatch(globalSlice.actions.changePositionTabBar(0));
    };
  });
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="items-center" style={{}}>
        <Image
          source={Icons.IconLight}
          style={{
            width: 50,
            height: 60,
          }}
        />
        <TouchableRipple
          className="absolute left-0 rounded-full top-0 bottom-0 justify-center w-[50] h-[50]"
          onPress={() => {
            router.replace('/home');
            dispatch(globalSlice.actions.changePositionTabBar(0));
          }}
          borderless
        >
          <ChevronLeft size={50} color={'white'} />
        </TouchableRipple>
      </View>
      <MaterialTopBar
        screenOptions={{
          swipeEnabled: false,
          animationEnabled: true,
          headerShown: true,
          headerStyle: {
            backgroundColor: 'red',
          },
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'HeadingNow-64Regular',
          },
          tabBarStyle: { backgroundColor: Colors.primaryBackgroundColor },
          tabBarIndicatorStyle: {
            borderBottomWidth: 1.5,
            borderBottomColor: 'black',
          },
          tabBarAllowFontScaling: false,
        }}
      >
        <MaterialTopBar.Screen
          name="index"
          options={{
            title: 'Đơn đang giao',
          }}
        />
        <MaterialTopBar.Screen
          name="order-history"
          options={{
            title: 'Lịch sử đơn hàng',
          }}
        />
      </MaterialTopBar>
    </SafeAreaView>
  );
};

export default OrderLayout;
