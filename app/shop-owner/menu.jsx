import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MenuTable from '../../components/shop-owner/MenuTable';
import { Button, Dialog, Searchbar, Snackbar } from 'react-native-paper';
import MenuCreate from '../../components/shop-owner/MenuCreate';
import { Modal } from 'react-native';
import { Colors } from '../../constant';

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
  const showDeleteDiaglog = () => setDeleteDialogVisible(true);
  const hideDeleteDiaglog = () => setDeleteDialogVisible(false);
  const confirmDelete = () => {
    hideDeleteDiaglog();
    showSnackbarDelete();
  };

  return (
    <View className="flex-1">
      <Text className="text-xl font-bold m-4 text-center uppercase tracking-wider text-primary">
        Quản lí Menu
      </Text>

      {/* Search + Create */}
      <View className="flex-row items-center justify-between px-5">
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="w-[50vw] my-3 bg-white"
        />
        <Button
          icon="plus"
          mode="contained"
          className="bg-primary"
          onPress={() => handleOpenCreate()}
        >
          Tạo Menu
        </Button>
      </View>
      <MenuTable showDeleteDiaglog={showDeleteDiaglog} />

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
      <Dialog className="bg-slate-100" visible={deleteDialogVisible} onDismiss={hideDeleteDiaglog}>
        <Dialog.Title>Cảnh báo</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Bạn có chắc chắn muốn xóa món ăn này không?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            className="px-5"
            mode="elevated"
            textColor={Colors.primaryBackgroundColor}
            onPress={hideDeleteDiaglog}
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
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
