import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import { Colors } from '../../constant';

const notification = [
  {
    id: 1,
    customerName: 'Đen Vâu',
    product: {
      name: 'Mỳ Quảng',
      quantity: 2,
    },
  },
  {
    id: 2,
    customerName: 'Jack 5tr',
    product: {
      name: 'Cháo thịt bằm',
      quantity: 1,
    },
  },
  {
    id: 3,
    customerName: 'Sơn Tùng M-TP',
    product: {
      name: 'Coffee',
      quantity: 3,
    },
  },
  {
    id: 4,
    customerName: 'Kiều chi',
    product: {
      name: 'Trà sữa trân châu',
      quantity: 2,
    },
  },
  {
    id: 5,
    customerName: 'Rosé',
    product: {
      name: 'Hambuger',
      quantity: 1,
    },
  },
  {
    id: 6,
    customerName: 'Vũ',
    product: {
      name: 'Cơm gà xối mỡ',
      quantity: 4,
    },
  },
  {
    id: 7,
    customerName: 'Mạc Văn Khoa',
    product: {
      name: 'Bún đậu mắm tôm',
      quantity: 2,
    },
  },
  {
    id: 8,
    customerName: 'Trường Giang',
    product: {
      name: 'Nem nướng',
      quantity: 3,
    },
  },
  {
    id: 9,
    customerName: 'Tùng Dương',
    product: {
      name: 'Hủ tiếu bò viên',
      quantity: 5,
    },
  },
  {
    id: 10,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
];

const handleAccept = () => {};

const Item = ({
  customerName,
  productName,
  quantity,
  handleAccept,
  visible,
  setVisible,
  reason,
  setReason,
}) => (
  <View className="px-5 py-2 m-2 bg-slate-300 rounded-lg">
    <View className="flex flex-row gap-2 justify-between">
      <View className="flex justify-center">
        <Text className="text-base">
          Tên khách hàng: <Text className="font-pmedium">{customerName}</Text>
        </Text>
        <Text className="text-base">
          Sản phẩm: <Text className="font-pmedium">{productName}</Text>
        </Text>
        <Text className="text-base">
          Số lượng: <Text className="font-pmedium">{quantity}</Text>
        </Text>
      </View>
      <View className="flex justify-center gap-2">
        <Button
          type="contained"
          mode="text"
          buttonColor={Colors.success}
          textColor="white"
          className="rounded-md h-9"
          labelStyle={{
            fontSize: 16,
            lineHeight: 18,
          }}
          onPress={() => handleAccept()}
        >
          Nhận đơn
        </Button>
        <Button
          type="contained"
          mode="text"
          buttonColor={Colors.loss}
          textColor="white"
          className="rounded-md h-9"
          labelStyle={{
            fontSize: 16,
            lineHeight: 18,
          }}
          onPress={() => setVisible(true)}
        >
          Từ chối
        </Button>
        <Portal>
          <Dialog
            className="bg-slate-100"
            visible={visible}
            onDismiss={() => {
              setVisible(false);
              setReason('');
            }}
          >
            <Dialog.Title>Lý do từ chối</Dialog.Title>
            <Dialog.Content>
              <TextInput label="Nhập lý do" value={reason} onChangeText={setReason} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                className="px-5"
                mode="elevated"
                textColor={Colors.primaryBackgroundColor}
                onPress={() => {
                  setVisible(false);
                  setReason('');
                }}
              >
                Hủy
              </Button>

              <Button
                className="px-5"
                mode="contained"
                buttonColor={Colors.primaryBackgroundColor}
                disabled={reason === ''}
                labelStyle={{
                  fontSize: 14,
                }}
                onPress={() => {
                  setVisible(false);
                  setReason('');
                }}
              >
                Xác nhận
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  </View>
);

export default function Notification() {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');

  const reviewer = ({ item }) => (
    <Item
      customerName={item.customerName}
      productName={item.product?.name}
      quantity={item.product?.quantity}
      handleAccept={handleAccept}
      visible={visible}
      setVisible={setVisible}
      reason={reason}
      setReason={setReason}
    />
  );

  return (
    <Provider>
      <FlatList data={notification} keyExtractor={(item) => item.id} renderItem={reviewer} />
    </Provider>
  );
}
