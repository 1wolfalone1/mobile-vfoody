import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { Button, Dialog, Searchbar, Snackbar } from 'react-native-paper';
import MenuCreate from '../../components/shop-owner/MenuCreate';
import MenuTable from '../../components/shop-owner/MenuTable';
import { Colors } from '../../constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarCreateVisible, setSnackbarCreateVisible] = useState(false);
  const [snackbarDeleteVisible, setSnackbarDeleteVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const showSnackbarCreate = () => setSnackbarCreateVisible(true);
  const hideSnackbarCreate = () => setSnackbarCreateVisible(false);
  const showSnackbarDelete = () => setSnackbarDeleteVisible(true);
  const hideSnackbarDelete = () => setSnackbarDeleteVisible(false);
  const showDeleteDialog = () => setDeleteDialogVisible(true);
  const hideDeleteDialog = () => setDeleteDialogVisible(false);
  const confirmDelete = () => {
    hideDeleteDialog();
    showSnackbarDelete();
  };

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold m-4 text-center tracking-wider text-primary">
        Quản lý thực đơn
      </Text>

      {/* Search + Create */}
      <View className="flex-row items-center justify-between px-5">
        <Searchbar
          placeholder="Tìm kiếm"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="w-[50vw] my-3 bg-slate-300"
        />
        <Button
          icon="plus-box-multiple-outline"
          mode="contained"
          className="bg-primary"
          theme={{ roundness: 8 }}
          labelStyle={{
            fontSize: 16,
            paddingVertical: 8,
          }}
          onPress={() => handleOpenCreate()}
        >
          Tạo mới
        </Button>
      </View>
      <MenuTable showDeleteDialog={showDeleteDialog} />

      {/* Create Modal */}
      <Modal visible={openCreate} onRequestClose={handleCloseCreate} animationType="slide">
        {/* Create menu Form */}
        <MenuCreate showSnackbarCreate={showSnackbarCreate} handleCloseCreate={handleCloseCreate} />
      </Modal>

      {/* Snack bar: Create */}
      <Snackbar visible={snackbarCreateVisible} onDismiss={hideSnackbarCreate}>
        Tạo sản phẩm thành công
      </Snackbar>

      {/* Snack bar: Delete */}
      <Snackbar visible={snackbarDeleteVisible} onDismiss={hideSnackbarDelete}>
        Xoá sản phẩm thành công
      </Snackbar>

      {/* Dialog: Delete */}
      <Dialog className="bg-slate-100" visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
        <Dialog.Title>Cảnh báo</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Bạn có chắc chắn muốn xóa món ăn này không?</Text>
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
          >
            Xóa
          </Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

export default Menu;
