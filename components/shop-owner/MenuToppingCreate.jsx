import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  Appbar,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import { Colors } from '../../constant';
import DropDownPicker from 'react-native-dropdown-picker';
import { Trash2 } from 'lucide-react-native';

const MenuToppingCreate = ({ handleCloseCreateTopping }) => {
  const [toppingName, setToppingName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [fields, setFields] = useState([{ toppingSubname: '', dialogPrice: 0 }]);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [showDeleteDiaglog, setShowDeleteDialog] = useState(false);
  const [deleteFieldIndex, setDeleteFieldIndex] = useState(null);
  const [items, setItems] = useState([
    { label: 'Chọn một', value: 'single' },
    { label: 'Chọn nhiều', value: 'many' },
  ]);

  const showPriceDialogHandler = (index) => {
    setShowPriceDialog(index);
  };

  const hidePriceDialogHandler = () => {
    setShowPriceDialog(false);
  };

  const showDeleteDialogHandler = (index) => {
    setDeleteFieldIndex(index);
    setShowDeleteDialog(true);
  };

  const hideDeleteDiaglogHandler = () => {
    () => setShowDeleteDialog(false);
  };

  const handleAddField = () => {
    const uniqueId = fields.length + 1;
    const newField = {
      id: uniqueId,
      toppingSubname: '',
      dialogPrice: 0,
    };
    setFields((prevFields) => [...prevFields, newField]);
  };

  const handleRemoveField = () => {
    if (deleteFieldIndex !== null) {
      setFields(fields.filter((field, i) => i !== deleteFieldIndex));
    }
    setShowDeleteDialog(false);
  };

  const handleInputChange = (index, text) => {
    const newFields = [...fields];
    newFields[index].toppingSubname = text;
    setFields(newFields);
  };

  const handleDialogPriceChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    const value = cleaned === '' ? 0 : parseInt(cleaned, 10);
    const newFields = [...fields];
    newFields[showPriceDialog].dialogPrice = value;
    setFields(newFields);
  };

  const confirmPriceHandler = () => {
    setShowPriceDialog(false);
    setFields(fields);
  };

  const createOptionHandler = () => {
    handleCloseCreateTopping();
  };

  const renderFields = () => {
    return fields.map((field, i) => (
      <View
        key={i}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {value === 'single' ? (
            <RadioButton disabled={true} color={Colors.primaryBackgroundColor} />
          ) : (
            <Checkbox disabled={true} color={Colors.primaryBackgroundColor} />
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton
              icon="image-plus"
              color={Colors.primaryBackgroundColor}
              size={25}
              onPress={() => console.log('Pressed')}
            />
            <TextInput
              value={field.toppingSubname}
              onChangeText={(text) => handleInputChange(i, text)}
              placeholder="Loại tuỳ chọn"
              mode="outlined"
              style={{ borderWidth: 0, width: 160 }}
              theme={{ colors: { primary: Colors.primaryBackgroundColor } }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => showPriceDialogHandler(i)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text>{field.dialogPrice}</Text>
            <Text style={{ marginLeft: 5, color: '#708090' }}>đ</Text>
          </TouchableOpacity>

          <View>
            <Trash2
              size={20}
              color="red"
              style={{ marginLeft: 10 }}
              onPress={() => showDeleteDialogHandler(i)}
            />
          </View>
        </View>
      </View>
    ));
  };

  return (
    <>
      <View>
        <ScrollView>
          <Appbar.Header>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={36}
              color={Colors.primaryBackgroundColor}
              onPress={handleCloseCreateTopping}
            />
            <Text className="font-bold text-xl pl-16">Tuỳ chọn thêm</Text>
          </Appbar.Header>

          <View className="px-3">
            <TextInput
              value={toppingName}
              onChangeText={(text) => setToppingName(text)}
              theme={{ colors: { primary: Colors.primaryBackgroundColor } }}
              className="font-semibold text-lg "
              mode="outlined"
              placeholder="Tên tuỳ chọn thêm"
              style={{ borderWidth: 0 }}
            />
          </View>

          {toppingName && (
            <>
              <View className="mt-3 px-3">
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  listMode="MODAL"
                  modalTitle="Chọn loại tuỳ chọn"
                  modalTitleStyle={{ color: Colors.primaryBackgroundColor }}
                  searchable={false}
                  modalAnimationType="slide"
                  style={{ borderColor: Colors.primaryBackgroundColor }}
                  placeholder={'Chọn loại tuỳ chọn'}
                  labelStyle={{ color: Colors.primaryBackgroundColor }}
                />
              </View>

              {value && (
                <>
                  <View className="mt-2 px-3">
                    {renderFields()}
                    <View>
                      <Button
                        mode="text"
                        textColor={Colors.primaryBackgroundColor}
                        className="border-b border-primary"
                        onPress={handleAddField}
                      >
                        Thêm
                      </Button>
                    </View>
                  </View>

                  <View className="flex-row justify-center items-center mt-10">
                    <Button
                      disabled={fields.some((field) => field.toppingSubname === '')}
                      mode="contained"
                      className="w-[50%] "
                      buttonColor={Colors.primaryBackgroundColor}
                      onPress={createOptionHandler}
                    >
                      Tạo
                    </Button>
                  </View>
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>

      {/* Price Dialog */}
      <Dialog
        theme={{ colors: { primary: Colors.primaryBackgroundColor } }}
        visible={showPriceDialog !== false}
        onDismiss={hidePriceDialogHandler}
      >
        <Dialog.Title className="text-lg font-bold text-center">Thêm giá cho lựa chọn</Dialog.Title>
        <Dialog.Content>
          <Text className="text-base mb-4">Nhập giá:</Text>
          <TextInput
            mode="outlined"
            className="border border-gray-300 rounded p-2 text-base flex-row"
            value={fields[showPriceDialog]?.dialogPrice?.toString()}
            onChangeText={(text) => handleDialogPriceChange(text)}
            keyboardType="numeric"
            outlineColor={Colors.primaryBackgroundColor}
            activeOutlineColor={Colors.primaryBackgroundColor}
            placeholder="0"
            theme={{
              colors: {
                primary: Colors.primaryBackgroundColor,
                text: Colors.primaryBackgroundColor,
                placeholder: Colors.primaryBackgroundColor,
              },
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            buttonColor={Colors.primaryBackgroundColor}
            onPress={() => confirmPriceHandler()}
          >
            Xác nhân
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* Confirm Remove Diaglog */}
      <Dialog
        theme={{ colors: { primary: Colors.primaryBackgroundColor } }}
        visible={showDeleteDiaglog}
        onDismiss={hideDeleteDiaglogHandler}
      >
        <Dialog.Icon icon="alert-circle" color="red" size={50} />
        <Dialog.Title className="text-xl font-bold text-center">
          Xác nhận xoá lựa chọn này
        </Dialog.Title>
        <Dialog.Content>
          <Text className="text-lg mb-4 text-center">
            Bạn có chắc chắn muốn xoá lựa chọn này không?
          </Text>
        </Dialog.Content>
        <Dialog.Actions className="flex-row justify-between items-center">
          <Button mode="contained" className="px-5" onPress={() => setShowDeleteDialog(false)}>
            Huỷ
          </Button>
          <Button
            mode="contained"
            buttonColor={Colors.primaryBackgroundColor}
            className="px-3 "
            onPress={() => handleRemoveField()}
          >
            Xác nhận
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default MenuToppingCreate;
