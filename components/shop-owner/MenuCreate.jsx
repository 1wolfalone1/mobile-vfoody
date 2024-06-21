import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Button, IconButton, TextInput } from 'react-native-paper';
import { launchImageLibrary as _launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../constant';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { ArrowDown, Check } from 'lucide-react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import MenuToppingList from './MenuToppingList';
import MenuToppingCreate from './MenuToppingCreate';

let launchImageLibrary = _launchImageLibrary;
const items = [
  { name: 'Ăn sáng', id: 1 },
  { name: 'Ăn trưa', id: 2 },
  { name: 'Ăn tối', id: 3 },
  { name: 'Ăn vặt', id: 4 },
  { name: 'Đồ uống', id: 5 },
];

const MenuCreate = ({ handleCloseCreate, showSnackbarCreate }) => {
  const [selectedMultipleTags, setMultipleSelectedTags] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [openCreateTopping, setOpenCreateTopping] = useState(false);
  const isEmpty = !name || !description || !price || !category;
  const showModaCreateTopping = () => setOpenCreateTopping(true);
  const hideModalCreateTopping = () => setOpenCreateTopping(false);
  const handleCloseCreateTopping = () => {
    setOpenCreateTopping(false);
  };
  const handleSubmit = () => {
    showSnackbarCreate();
    handleCloseCreate();
  };
  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setImageUri(imageUri);
    }
  };

  // Handle upload image
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, handleResponse);
  };

  return (
    <ScrollView className="">
      <View className="px-5 pb-5 flex-1 flex-col justify-between">
        <View className="flex-0.9">
          <Appbar.Header>
            <Icon
              name="arrow-back-ios-new"
              size={36}
              color={Colors.primaryBackgroundColor}
              onPress={handleCloseCreate}
            />
            <Text className="font-bold text-xl pl-16">Tạo mới sản phẩm</Text>
          </Appbar.Header>
          <TouchableOpacity
            //     onPress={openImagePicker}
            className="items-center justify-center h-40 bg-gray-200 mb-3 rounded-lg"
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" />
            ) : (
              <Text className="text-gray-500 text-xl">Chọn ảnh</Text>
            )}
          </TouchableOpacity>

          <TextInput
            label="Tên sản phẩm"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            className="mb-3"
            outlineStyle={{ borderRadius: 12 }}
            activeOutlineColor="#DF4830"
            outlineColor="#DF4830"
          />
          <TextInput
            label="Mô tả sản phẩm"
            value={description}
            onChangeText={(text) => setDescription(text)}
            mode="outlined"
            className="mb-3"
            outlineStyle={{ borderRadius: 12 }}
            activeOutlineColor="#DF4830"
            outlineColor="#DF4830"
          />
          <TextInput
            label="Giá bán"
            value={price}
            onChangeText={(number) => setPrice(number)}
            mode="outlined"
            keyboardType="numeric"
            className="mb-3"
            outlineStyle={{ borderRadius: 12 }}
            outlineColor="#DF4830"
            activeOutlineColor="#DF4830"
            right={<TextInput.Affix text="VND" />}
          />

          {/* Tags */}
          <SectionedMultiSelect
            confirmText="Xác nhận"
            headerComponent={
              <View className="flex-row justify-center items-center bg-primary py-5">
                <Text className="text-xl font-semibold text-white">
                  Chọn phân loại đồ ăn cho shop
                </Text>
              </View>
            }
            selectedItems={selectedMultipleTags}
            selectText="Chọn phân loại"
            selectedIconComponent={<Check size={22} color={Colors.primaryBackgroundColor} />}
            selectToggleIconComponent={
              <ArrowDown size={22} color={Colors.primaryBackgroundColor} />
            }
            selectedText="phân loại"
            items={items}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setMultipleSelectedTags}
            modalAnimationType="slide"
            hideSearch={true}
            colors={{ primary: Colors.primaryBackgroundColor }}
            styles={{
              selectToggle: styles.multiSelectBox,
              chipContainer: styles.multiSelectChipContainer,
              chipText: styles.multiSelectChipText,
              item: styles.multiSelectItem,
              selectedSubItem: styles.multiSelectSelectedSubItem,
              itemText: styles.multiSelectItemText,
              button: styles.selectBtn,
            }}
          />

          {/* Toppings */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">Tuỳ chọn thêm</Text>
            <IconButton
              icon="plus"
              iconColor={Colors.primaryBackgroundColor}
              size={30}
              onPress={showModaCreateTopping}
            />
          </View>
          {/* Topping List */}
          <MenuToppingList />
        </View>

        <View className="mt-24 flex-0.1">
          <Button
            disabled={isEmpty}
            mode="contained"
            onPress={handleSubmit}
            buttonColor={Colors.primaryBackgroundColor}
            textColor={Colors.commonBtnText}
            contentStyle={{
              paddingVertical: 4,
            }}
            labelStyle={{
              fontSize: 18,
              lineHeight: 20,
            }}
          >
            Thêm mới
          </Button>
        </View>
      </View>

      {/* Create topping modal */}
      <Modal
        animationType="slide"
        visible={openCreateTopping}
        onRequestClose={hideModalCreateTopping}
      >
        <MenuToppingCreate handleCloseCreateTopping={handleCloseCreateTopping} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  multiSelectBox: {
    borderWidth: 1,
    borderColor: '#DF4830',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  multiSelectChipContainer: {
    marginTop: 20,
    borderWidth: 0,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  multiSelectChipText: {
    color: '#222',
    fontSize: 14.5,
  },
  multiSelectItem: {
    marginVertical: 10,
  },
  multiSelectItemText: {
    fontSize: 20,
  },
  selectBtn: {
    height: 60,
  },
});

export default MenuCreate;
