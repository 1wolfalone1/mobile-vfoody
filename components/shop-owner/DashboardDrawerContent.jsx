import { router, usePathname } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Drawer } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const dashboardNavigations = [
  {
    icon: 'home',
    label: 'Trang chủ',
    path: 'dashboard',
  },
  {
    icon: 'account',
    label: 'Tài khoản',
    path: 'account',
  },
  {
    icon: 'history',
    label: 'Lịch sử đơn hàng',
    path: 'order-history',
  },
  {
    icon: 'comment-edit-outline',
    label: 'Đánh giá',
    path: 'review',
  },
  {
    icon: 'cash-check',
    label: 'Thanh toán',
  },
  {
    icon: 'cog',
    label: 'Cài đặt',
  },
  {
    icon: 'chat-question',
    label: 'Trợ giúp',
  },
];

const DashboardDrawerContent = ({ closeDrawer }) => {
  const path = usePathname();
  const [, , currentPathName] = path.split('/');
  const handleLogout = () => {
    router.push('/sign-in');
  };
  const handleNavigate = (pathName) => {
    router.push(`/shop-owner/${pathName}`);
    closeDrawer();
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white flex-col">
        <View className="p-5">
          <Avatar.Image
            size={90}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/64c9/abd5/14946a5ee5d33c50da9e1a5a6fb5beee?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bej~A4eILOz7WAdK1EFAnQ6PkmMFYSjPCcZEA-fZi5w~ggg6yr48hvZELMtwvEulcYjmgS7ZYsJWQhlL481zGJM7FnnPDEGp1et942WwDxdoB7KjzI~8F89kATVYF6kLKdosd5bUa2olmq3MFntFHBgcnVwNHFAssO1~7RfeSrTHelgAEZK2LnYqcURRx5-m5THD9Zbxl-IFkUxqjvPKCNGKIhCM8MOqf0qko4XizUv2teZrYwBB0oMno63p7fFWJWP~h~yki7rw956cbWn-ScuEfts0ZJvL6pTs8Wj~S5vtGWacf26xyDhFkcDEO8Ils-RcSNmwImbm-0msD8nxeQ__',
            }}
          />
          <View className="flex-col mt-3">
            <Text className="text-xl font-semibold">Tiệm ăn tháng năm</Text>
            <Text className="text-sm text-slate-500">Tòa S1.01 VinHome</Text>
          </View>
        </View>

        <Drawer.Section>
          {dashboardNavigations.map((navigation) => {
            return (
              <Drawer.Item
                key={navigation.label}
                active={currentPathName === navigation.path}
                icon={navigation.icon}
                label={navigation.label}
                onPress={() => handleNavigate(navigation.path)}
              />
            );
          })}
        </Drawer.Section>
      </SafeAreaView>

      <View className="pl-3 pb-5">
        <Button
          type="contained"
          icon="logout"
          mode="contained"
          buttonColor="#DF4830"
          className="w-36 rounded-xl"
          labelStyle={{
            fontSize: 16,
          }}
          onPress={() => handleLogout()}
        >
          Đăng xuất
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default DashboardDrawerContent;
