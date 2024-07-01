import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { SlidersHorizontal } from 'lucide-react-native';
import * as React from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar, Button, IconButton, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constant';
import colors from '../../constant/colors';
import searchSlice, { searchSliceSelector } from '../../redux/slice/searchSlice';
import { userInfoSliceSelector } from '../../redux/slice/userSlice';

const Header_Max_Height = 90;
const Header_Min_Height = 20;

export default function DynamicHeader({ animHeaderValue }) {
  const userData = useSelector(userInfoSliceSelector);
  const navigation = useNavigation();
  const {
   searchProductInHome: {filter} 
  } = useSelector(searchSliceSelector)
  const dispatch = useDispatch();
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      // style={[
      //   styles.header,
      //   {
      //     height: animateHeaderHeight,
      //     backgroundColor: animateHeaderBackgroundColor,
      //     opacity: animateHeaderBackgroundColor,
      //     overflow: 'hidden'
      //   }
      //
      // ]}
      className="pb-2"
    >
      <Animated.View
        className="gap-3 flex-col"
        style={[
          {
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
            opacity: animateHeaderBackgroundColor,
            overflow: 'hidden',
          },
        ]}
      >
        <View className="flex-row justify-between items-center pl-7 pr-7">
          <TouchableRipple borderless onPress={() => router.push('/setting-list')} className="rounded-full">
            <Avatar.Image
              size={40}
              source={
                userData != null && userData.avatarUrl
                  ? {
                      uri: userData.avatarUrl,
                    }
                  : {
                      uri: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
                    }
              }
            />
          </TouchableRipple>
          <View className="justify-center items-center">
            <Button
              textColor={Colors.greyText}
              labelStyle={{
                // fontFamily: 'Poppins-Regular',
                fontSize: 14,
                lineHeight: 15,
              }}
              onPress={() => {}}
              mode="text"
              contentStyle={{ flexDirection: 'row-reverse', alignItems: 'center' }}
              icon="chevron-down"
            >
              Giao toi
            </Button>
            <Text className="text-primary font-hnow64regular">Tòa S1.01 VinHome Grand Park</Text>
          </View>
          <View className="flex-row ">
            <TouchableRipple
              onPress={() => router.push('chat')}
              className="rounded-full"
              style={{
                borderRadius: 1000,
                
              }}
              borderless
            >
              <View className="" style={{backgroundColor: '#8f88883a' , padding: 8 }}> 
                <Ionicons name="chatbubble-ellipses" size={24} color={colors.blue[100]} />
              </View>
            </TouchableRipple>
          </View>
        </View>
      </Animated.View>

      <View className="flex-row items-center pb-0 ">
        <View
          className="ml-7  flex-row justify-start items-center border-solid border-3 border-primary rounded-xl w-[75%]"
          style={{
            borderWidth: 1,
          }}
        >
          <IconButton
            icon="magnify"
            iconColor={Colors.primaryBackgroundColor}
            onPress={() => {
              router.push('/home/search-list')
            }}
          />
          <TextInput
            onFocus={() => router.push('/home/search')}
            className="flex-1 font-hnow63book"
            value={filter.searchText}
            onChangeText={(value) => {
              dispatch(searchSlice.actions.updateFilterInSearchProductInHome({
                searchText: value,
              }));
            }}
            placeholder="Tìm kiếm món ăn hay shop house?"
          />
        </View>
        <TouchableRipple
          className="p-2 ml-2 rounded-full "
          style={styles.shadow}
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <SlidersHorizontal size={32} color={Colors.primaryBackgroundColor} />
        </TouchableRipple>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    overflow: 'hidden',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shadow: {
    shadowOffset: { width: 4, height: 5 },
    shadowColor: Colors.shadow.DEFAULT,

    shadowOpacity: 0.2,
    elevation: 5,
    // background color must be set
  },
});
