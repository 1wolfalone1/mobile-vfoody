import React, { useState } from 'react';
import { Text, View } from 'react-native';
import NotificationList from '../../components/shop-owner/Notification';
import { Button, Dialog, TextInput } from 'react-native-paper';
import { Colors } from '../../constant';

const Notification = () => {
  const [reason, setReason] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const showDeleteDialog = () => setDeleteDialogVisible(true);
  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setReason('');
  };
  const confirmDelete = () => {
    hideDeleteDialog();
  };

  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Thông báo đơn hàng mới
      </Text>
      <NotificationList showDeleteDialog={showDeleteDialog} />

      {/* Dialog for cancel order */}
      <Dialog className="bg-slate-100" visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
        <Dialog.Title className='text-center'>Lý do từ chối</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Vui lòng nhập lý do"
            value={reason}
            onChangeText={setReason}
            mode="outlined"
            outlineStyle={{ borderRadius: 12 }}
            className="text-base"
            activeOutlineColor="#DF4830"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            className="px-5"
            mode="elevated"
            textColor={Colors.primaryBackgroundColor}
            onPress={hideDeleteDialog}
          >
            Hủy
          </Button>
          <Button
            mode="contained"
            className="px-5"
            buttonColor={Colors.primaryBackgroundColor}
            onPress={confirmDelete}
            disabled={reason === ''}
            labelStyle={{
              fontSize: 14,
            }}
          >
            Xác nhận
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

export default Notification
