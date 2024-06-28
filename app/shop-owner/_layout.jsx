import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Colors } from '../../constant';

const TabIcon = ({ name, iconName }) => {
  return (
    <TouchableRipple
      className="items-center justify-center h-full w-full rounded-full"
      onPress={() => router.push('/' + name)}
      rippleColor="rgba(80, 80, 80, 0.075)"
      borderless={true}
    >
      <View className="">{iconName}</View>
    </TouchableRipple>
  );
};
const ShopOwnerLayout = () => {
  return (
    <>
      <Tabs
        initialRouteName="dashboard"
        animation=""
        screenOptions={{
          tabBarActiveTintColor: Colors.commonBtnText,
          tabBarInactiveTintColor: Colors.tertiaryTextColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.primaryBackgroundColor,
            borderTopWidth: 1,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          screenOptions={{
            animation: 'flip',
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="shop-owner/dashboard"
                iconName={
                  <MaterialCommunityIcons
                    name="view-dashboard-outline"
                    size={24}
                    color={focused ? Colors.activeTabColor : Colors.commonBtnText}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            freezeOnBlur: true,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="shop-owner/menu"
                iconName={
                  <MaterialIcons
                    name="restaurant-menu"
                    size={24}
                    color={focused ? Colors.activeTabColor : Colors.commonBtnText}
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="promotion"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="shop-owner/promotion"
                iconName={
                  <Ionicons
                    name="ticket-outline"
                    size={24}
                    color={focused ? Colors.activeTabColor : Colors.commonBtnText}
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="shop-owner/order"
                iconName={
                  <Octicons
                    name="list-ordered"
                    size={24}
                    color={focused ? Colors.activeTabColor : Colors.commonBtnText}
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="shop-owner/notification"
                iconName={
                  <Ionicons
                    name="notifications"
                    size={24}
                    color={focused ? Colors.activeTabColor : Colors.commonBtnText}
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen
          name="order-history"
          options={{
            headerShown: false,
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
      </Tabs>
    </>
  );
};

export default ShopOwnerLayout;
