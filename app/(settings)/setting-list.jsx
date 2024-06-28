import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { Contact, LogOut, Store } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import api from '../../api/api';
import HeaderSimple from '../../components/common/HeaderSimple';
import AvatarChange from '../../components/setting/AvatarChange';
import colors from '../../constant/colors';
import shopOwnerSlice from '../../redux/slice/shopOwnerSlice';

const SettingsLayout = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderSimple title={'Cài đặt'} />

      <View>
        <AvatarChange />
        <View>
          <TouchableRipple onPress={() => router.push('/user')}>
            <View className="flex-row gap-4 items-center p-2">
              <Contact size={40} color={colors.primaryBackgroundColor} />
              <Text className="text-lg text-primary">Thay đổi thông tin</Text>
            </View>
          </TouchableRipple>
          <Divider className="w-full" style={{ height: 1 }} />
          <TouchableRipple
            onPress={async () => {
              try {
                const res = await api.get('/api/v1/shop/login');
                const data = await res.data;
                if (data.isSuccess) {
                  dispatch(shopOwnerSlice.actions.updateInfo(data.value));
                  await AsyncStorage.setItem('@token', data.value.accessTokenResponse.accessToken);
                  router.push('/shop-owner');
                } else {
                  console.log(data, ' error in fail  request go to shop');
                  router.push('/upgrade-shop');
                }
              } catch (e) {
                console.log(e, ' error in catch go to shop');
                router.push('/upgrade-shop');
              }
            }}
          >
            <View className="flex-row gap-4 items-center p-2">
              <Store size={40} color={colors.primaryBackgroundColor} />
              <Text className="text-lg text-primary">Cửa hàng</Text>
            </View>
          </TouchableRipple>
          <Divider className="w-full" style={{ height: 1 }} />
          <TouchableRipple
            onPress={async () => {
              const a = await auth().signOut();
              console.log(a, ' sign out ------------------------------');

              await AsyncStorage.setItem('@token', '');

              await AsyncStorage.setItem('@statusLogin', '');
              router.push('/sign-in');
            }}
          >
            <View className="flex-row gap-4 items-center p-2">
              <LogOut size={40} color={colors.primaryBackgroundColor} />
              <Text className="text-lg text-primary">Đăng xuất</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsLayout;
