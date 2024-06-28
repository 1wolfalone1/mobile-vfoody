import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PreviewCardChat from '../../components/chat/PreviewCardChat';
const emptyList = Array(5).fill(null);
const ListChatChannelPage = () => {
  const handleGetListChatChannel = async () => {
    const chatCollection = await firestore().collection('chatrooms').get();
    const test = chatCollection.docChanges();
  };
  const [listChannel, setListChannel] = useState([]);
  useEffect(() => {
    const user = auth().currentUser;
    const subscriber = firestore()
      .collection('chatrooms')
      .doc(user.email + '-123')
      .onSnapshot((documentSnapshot) => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  return (
    <SafeAreaView edges={['bottom']} className="">
      <FlatList
        data={listShop ? listShop : emptyList}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 20,
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <PreviewCardChat item={item} />}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              height: 0,
              marginVertical: 10,
              backgroundColor: '#b1b1b1',
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ListChatChannelPage;

const listShop = [
  {
    id: 123,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
    channelId: 'thientryhard@gmail.com',
  },
  {
    id: 12,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
    channelId: 'phuothuynhfptk16@gmail.com',
  },
  {
    id: 1232,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
      
    channelId: 'thiencnse160231@fpt.edu.vn',
  },
  {
    id: 1,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
  {
    id: 12213,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
  {
    id: 132,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
  {
    id: 233,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
  {
    id: 1223,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
  {
    id: 23,
    shopName: 'Shop',
    text: 'This is test chate',
    logoUrl:
      'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
  },
];
