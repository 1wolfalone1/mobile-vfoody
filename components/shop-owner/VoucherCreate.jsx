import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary as _launchImageLibrary } from 'react-native-image-picker';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { Colors } from '../../constant';

let launchImageLibrary = _launchImageLibrary;

const VoucherCreate = ({ handleCloseCreate, showSnackbarCreate }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const isEmpty = !name || !quantity || !description || !dueDate;
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    console.log('Form submitted:', { name, quantity, price, category });
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
    <View className="px-5 pb-5 flex-1 flex-col justify-between">
      <View>
        <Appbar.Header>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={36}
            color={Colors.primaryBackgroundColor}
            onPress={handleCloseCreate}
          />
          <Text className="font-bold text-xl pl-16">Tạo mới khuyến mãi</Text>
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
          label="Tên mã khuyến mãi"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          className="mb-3"
          outlineStyle={{ borderRadius: 12 }}
          activeOutlineColor="#DF4830"
          outlineColor="#DF4830"
        />
        <TextInput
          label="Mô tả khuyến mãi"
          value={description}
          onChangeText={(text) => setDescription(text)}
          mode="outlined"
          className="mb-3"
          outlineStyle={{ borderRadius: 12 }}
          activeOutlineColor="#DF4830"
          outlineColor="#DF4830"
        />
        <TextInput
          label="Số lượng"
          value={quantity}
          onChangeText={(number) => setQuantity(number)}
          mode="outlined"
          keyboardType="numeric"
          className="mb-3"
          outlineStyle={{ borderRadius: 12 }}
          outlineColor="#DF4830"
          activeOutlineColor="#DF4830"
        />
        <TextInput
          label="Hạn sử dụng"
          value={dueDate}
          onChangeText={(date) => setDueDate(date)}
          mode="outlined"
          className="mb-3"
          outlineStyle={{ borderRadius: 12 }}
          outlineColor="#DF4830"
          activeOutlineColor="#DF4830"
        />
        {/* <DropDownPicker
          open={open}
          setOpen={setOpen}
          items={categoryList.map((item) => ({ label: item.name, value: item.name }))}
          placeholder="Chọn danh mục"
          value={category}
          setValue={setCategory}
          className="w-full border-primary py-3 mb-3"
          style={{
            borderColor: Colors.primaryBackgroundColor,
            minHeight: 20,
            borderRadius: 12,
            zIndex: 90,
          }}
          dropDownContainerStyle={{
            backgroundColor: 'white',
            minHeight: 30,
            paddingHorizontal: 1,
            fontSize: 10,
            borderColor: Colors.primaryBackgroundColor,
          }}
          onChangeItem={(item) => setCategory(item.value)}
        /> */}
      </View>

      <View className="mt-9">
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
  );
};

export default VoucherCreate;
