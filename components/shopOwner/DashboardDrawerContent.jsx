import React from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Drawer } from 'react-native-paper';

const DashboardDrawerContent = () => {
  const [active, setActive] = React.useState('');
  return (
    <>
      <View className="flex-1 bg-white flex-col">
        <View className="py-5 px-5">
          <Avatar.Image
            size={90}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/64c9/abd5/14946a5ee5d33c50da9e1a5a6fb5beee?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bej~A4eILOz7WAdK1EFAnQ6PkmMFYSjPCcZEA-fZi5w~ggg6yr48hvZELMtwvEulcYjmgS7ZYsJWQhlL481zGJM7FnnPDEGp1et942WwDxdoB7KjzI~8F89kATVYF6kLKdosd5bUa2olmq3MFntFHBgcnVwNHFAssO1~7RfeSrTHelgAEZK2LnYqcURRx5-m5THD9Zbxl-IFkUxqjvPKCNGKIhCM8MOqf0qko4XizUv2teZrYwBB0oMno63p7fFWJWP~h~yki7rw956cbWn-ScuEfts0ZJvL6pTs8Wj~S5vtGWacf26xyDhFkcDEO8Ils-RcSNmwImbm-0msD8nxeQ__',
            }}
          />
          <View className="flex-col mt-3">
            <Text className="text-[18px] font-semibold">Tiệm ăn tháng năm</Text>
            <Text className="text-[12px] text-slate-500">Tòa S1.01 VinHome</Text>
          </View>
        </View>

        <Drawer.Section>
          <Drawer.Item
            active={active === 'first'}
            icon="account"
            label="Tài khoản"
            onPress={() => setActive('first')}
          />
          <Drawer.Item
            active={active === 'second'}
            icon="mail"
            label="Hộp thư"
            onPress={() => setActive('second')}
          />
          <Drawer.Item
            active={active === 'third'}
            icon="wallet"
            label="Thanh toán"
            onPress={() => setActive('third')}
          />
          <Drawer.Item
            active={active === 'fourth'}
            icon="cog"
            label="Cài đặt"
            onPress={() => setActive('fourth')}
          />
          <Drawer.Item
            active={active === 'fifth'}
            icon="chat-question"
            label="Trợ giúp"
            onPress={() => setActive('fifth')}
          />
        </Drawer.Section>
      </View>

      <View className="pl-3 pb-5">
        <Button
          type="contained"
          icon="logout-variant"
          mode="contained"
          buttonColor="#DF4830"
          className="w-[30vw] rounded-xl"
        >
          Đăng xuất
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default DashboardDrawerContent;
