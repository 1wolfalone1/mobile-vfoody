import { Tabs, router } from 'expo-router';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import TabBar from '../../components/common/TabBar';
// const TabIcon = ({ icon, color, name, focused, iconName }) => {
//   return (
//     <View className="items-center justify-center ">
//       <IconButton
//         icon={iconName}
//         theme={{ colors: { secondary: "white" } }}
//         iconColor={focused ? "#e5ff00" : Colors.commonBtnText}
//         size={28}
//         onPress={(e) => {
//           router.push("/" + name);
//         }}
//       />
//     </View>
//   );
// };
const TabIcon = ({ icon, color, name, focused, iconName }) => {
  return (
    <TouchableRipple
      className="items-center justify-center h-full w-full  rounded-full"
      onPress={() => router.push('/' + name)}
      rippleColor="rgba(80, 80, 80, 0.075)"
      borderless={true}
    >
      <View className="">{iconName}</View>
    </TouchableRipple>
  );
};
const TabLayout = () => {
  return (
    <>
      <Tabs initialRouteName="homes" animation="" tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          screenOptions={{
            animation: 'flip',
          }}
          options={{
            title: "Trang chủ",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: 'Đơn hàng',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Giỏ hàng',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notify"
          options={{
            title: 'Thông báo',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="like"
          options={{
            title: 'Yêu thích',
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
