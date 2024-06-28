import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, InputToolbar, Send as SendMess } from 'react-native-gifted-chat';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constant';
const dayjs = require('dayjs');
const currentUser = auth().currentUser;

const db = firestore();
const ChatChannel = () => {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  console.log(params);

  const getAllChats = async (chatroomID) => {
    try {
      if (!chatroomID) {
        console.error('Error: chatroomID is required');
        return () => {};
      }
    } catch (error) {
      console.error('Error getting chats:', error);
      return () => {};
    }
  };
  const handleRoomClick = async (otherUserEmail) => {
    try {
      // Create a query to find a chatroom with both emails
      const chatroomQuery = db
        .collection('chatrooms')
        .where('emails', 'array-contains', currentUser.email);

      const querySnapshot = await chatroomQuery.get();

      // Check if a chatroom already exists
      if (querySnapshot.size > 0) {
        // Existing chatroom found
        
        const existingChatroom = querySnapshot.docs[0];
        console.log('Joined existing chatroom:', existingChatroom.id, otherUserEmail);
        setChatRoomId(existingChatroom.id);
        // Handle joining logic for the existing chatroom (replace with your implementation)
      } else {
        // Create a new chatroom
        const newChatroom = {
          emails: [currentUser.email, otherUserEmail],
          // Add other fields as needed (e.g., creation timestamp)
        };

        const docRef = await db.collection('chatrooms').add(newChatroom);
        console.log('Created new chatroom:', docRef.id);
        setChatRoomId(docRef.id);
        // Handle joining logic for the newly created chatroom (replace with your implementation)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleRoomClick(params.id);
  }, []);
  useEffect(() => {
    if (chatRoomId) {
      // Create a reference to the chatroom's messages subcollection
      const messagesRef = db
        .collection('chatrooms')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      // Create a listener on the messages subcollection
      const unsub = messagesRef.onSnapshot(
        (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id, // Assuming you have an _id field for each message
            createdAt: doc
              .data()
              .createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }));

          // Handle the retrieved chat messages (replace with your implementation)
          console.log('Chat messages:', messages);
          setMessages(messages);
        },
        (e) => {
          console.log('Error:', e);
        },
        (e) => {},
      );
      console.log('Message', unsub);

      return () => unsub();
    }
  }, [chatRoomId]);

  const onSend = async (message) => {
    try {
      if (!chatRoomId || !message) {
        console.error('Error: chatroomID and message are required', chatRoomId, '- ', message);
        return;
      }
      // Create a reference to the chatroom's messages subcollection
      const messagesRef = db.collection('chatrooms').doc(chatRoomId).collection('messages');

      // Create a new message document with timestamp and user info
      const { _id, createdAt, text, user } = message[0];

      console.log(chatRoomId, message[0], ' test -----------', createdAt);
      const newMessage = { _id, createdAt, text, user };
      console.log(newMessage);
      // Add the new message to the messages subcollection

      await messagesRef.add(newMessage);

      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <>
      <SafeAreaView className="bg-primary p-2" edges={['top']}>
        <View className="flex-row items-center gap-4 pl-2">
          <TouchableRipple className="rounded-full p-2" borderless onPress={() => router.back()}>
            <ArrowLeft size={25} color={'white'} strokeWidth={2} />
          </TouchableRipple>
          <View className="flex-row items-center ">
            {
              <Avatar.Image
              source={{
                uri: user2.logoUrl,
              }}
              size={50}
            />
            }
            <Text className="text-white font-semibold text-lg ml-4">{params.id}</Text>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView className="flex-1 bg-white pb-4">
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderChatFooter={() => {
            return <View className="h-[20] "></View>;
          }}
          renderSend={(props) => {
            const { text, messageIdGenerator, user, onSend } = props;
            return (
              <SendMess {...props} containerStyle={{}}>
                <TouchableRipple className="rounded-full p-2" borderless>
                  <Send color={'blue'} size={24} />
                </TouchableRipple>
              </SendMess>
            );
          }}
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'center',
                padding: 6,
                borderRadius: 30,
                borderTopColor: 'white',
                borderWidth: 1,
                borderColor: Colors.primaryBackgroundColor,
                ...styles.shadow,
              }}
            />
          )}
          user={{
            _id: auth()?.currentUser?.email,
            name: auth()?.currentUser?.displayName,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default ChatChannel;

const user2 = {
  id: 123,
  shopName: 'Tiệm trà tháng năm',
  text: 'This is test chate',
  logoUrl:
    'https://repository-images.githubusercontent.com/366884555/c2d2e700-b396-11eb-871e-2faafc8e4d07',
};
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 8 },
    shadowColor: Colors.shadow[300],

    shadowOpacity: 0.2,
    elevation: 4,
    // background color must be set
  },
  shadowSelected: {
    shadowOffset: { width: 8, height: 8 },
    shadowColor: Colors.shadow.DEFAULT,

    shadowOpacity: 0.6,

    elevation: 20,
    // background color must be set
  },
});
