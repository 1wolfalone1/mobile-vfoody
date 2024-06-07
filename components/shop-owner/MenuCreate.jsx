import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { categoryList } from '../../data/Menu';
import { launchImageLibrary as _launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../constant';

let launchImageLibrary = _launchImageLibrary;

const MenuCreate = ({ handleCloseCreate, showSnackbarCreate }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const isEmpty = !name || !quantity || !price || !category;
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
          <Appbar.BackAction onPress={handleCloseCreate} />
          <Appbar.Content title="Trở về Menu" />
        </Appbar.Header>
        <TouchableOpacity
          //     onPress={openImagePicker}
          className="items-center justify-center h-40 bg-gray-200 mb-3 rounded-lg"
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" />
          ) : (
            <Text className="text-gray-500">Select Image</Text>
          )}
        </TouchableOpacity>

        <TextInput
          label="Tên"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          className="mb-3"
          outlineStyle={{ borderRadius: 20 }}
          activeOutlineColor="#DF4830"
          outlineColor="#DF4830"
        />
        <TextInput
          label="Số lượng"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          mode="outlined"
          keyboardType="numeric"
          className="mb-3"
          outlineStyle={{ borderRadius: 20 }}
          activeOutlineColor="#DF4830"
          outlineColor="#DF4830"
        />
        <TextInput
          label="Giá"
          value={price}
          onChangeText={(text) => setPrice(text)}
          mode="outlined"
          keyboardType="numeric"
          className="mb-3"
          outlineStyle={{ borderRadius: 20 }}
          outlineColor="#DF4830"
          activeOutlineColor="#DF4830"
          right={<TextInput.Affix text="VND" />}
        />
        <DropDownPicker
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
            borderRadius: 20,
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
        />
      </View>

      <View className="mt-9">
        <Button
          disabled={isEmpty}
          mode="contained"
          onPress={handleSubmit}
          className={`${isEmpty ? 'bg-gray-500 h-100' : 'bg-[#DF4830] h-100'}`}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default MenuCreate;
