import { NotebookPen } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Modal,
  Portal,
  TouchableRipple,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constant';
import cartSlice, { cartSelector } from '../../redux/slice/cartSlice';
import { formatNumberVND } from '../../utils/MyUtils';
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 4, height: 4 },
    shadowColor: Colors.shadow[300],

    shadowOpacity: 0.3,
    elevation: 12,
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
const ItemInCart = ({ item, shopId }) => {
  const { width, height } = Dimensions.get('window');
  const heightItem = parseInt((width * 30) / 100);
  const widthItem = parseInt((width * 85) / 100);
  const { items } = useSelector(cartSelector);
  const [itemInCart, setItemInCart] = useState({});
  const [toppingString, setToppingString] = useState('');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [topping, setTopping] = useState('');
  const [openNote, setOpenNote] = useState(false);
  const [noteTemp, setNoteTemp] = useState('');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [heightNote, setHeightNote] = useState(200);
  useEffect(() => {
    if (items) {
      console.log(items, ' itemsInfo');
      const itemsInfo = items[shopId]?.find((e) => e.productId === item.id);

      if (!itemsInfo) {
        return;
      }
      setItemInCart(itemsInfo);
      let toppingString = '';
      let isHasRadio = false;
      Object.values(itemsInfo.topping.radio).forEach((item, index) => {
        if (item) {
          if (index === 0) {
            toppingString += item.topping.description + ' : ' + item.option.description;
          } else {
            toppingString += ' - ' + item.topping.description + ' : ' + item.option.description;
          }
          isHasRadio = true;
        }
      });
      Object.values(itemsInfo.topping.checkbox).forEach((item, index) => {
        console.log(item, ' tessssssssssssssssssssssss');
        if (item) {
          const checkBoxToppingString = item.options.reduce((a, option, index) => {
            console.log(option);
            if (index == 0) {
              return option.description;
            } else {
              return a + ', ' + option.description;
            }
          }, '');
          if (index == 0) {
            if (isHasRadio) {
              toppingString += ' --- ' + item.topping.description + ': ' + checkBoxToppingString;
            } else {
              toppingString += item.topping.description + ': ' + checkBoxToppingString;
            }
          } else {
            toppingString += ' - ' + item.topping.description + ': ' + checkBoxToppingString;
          }
        }
      });
      console.log(toppingString, ' toppingggggggggggggggggg');
      setToppingString(toppingString);
      setQuantity(itemsInfo.quantity);
      setNoteTemp(itemsInfo.note);
    }
  }, [items]);
  console.log(item, ' item ne');
  const handleRemoveItem = () =>
    dispatch(
      cartSlice.actions.removeItemInCart({
        shopId: shopId,
        itemId: item.id,
      }),
    );
  const handleOpenNote = () => {
    console.log(item, 'noteeeeeeeeeeeeeeeeeeeeee');
    setNoteTemp(itemInCart?.note);
    setOpenNote(true);
  };
  const handleHideNote = () => {
    setOpenNote(false);
  };
  const handleSaveNote = () => {
    setOpenNote(false);
    dispatch(
      cartSlice.actions.setNote({
        shopId: shopId,
        itemId: item.id,
        note: noteTemp,
      }),
    );
  };
  const hideDialog = () => setVisible(false);
  const handleChangeQuantity = (value) => {
    if (!Number.isNaN(value)) {
      let valueNum = parseInt(value);
      console.log(value);
      if (valueNum < 0 || Number.isNaN(valueNum)) {
        valueNum = 0;
      }
      console.log(valueNum, ' asdfasfasfasdffffffffffffffffffff');
      setQuantity(valueNum);
      dispatch(
        cartSlice.actions.setQuantity({
          shopId: shopId,
          itemId: item.id,
          quantity: valueNum,
        }),
      );
    }
  };
  const handleBlurInputQuantity = () => {
    if (quantity == 0) {
      dispatch(
        cartSlice.actions.removeItemInCart({
          shopId: shopId,
          itemId: item.id,
        }),
      );
    }
  };
  const handleDecreaseQuantity = () => {
    if (quantity == 1) {
      dispatch(
        cartSlice.actions.removeItemInCart({
          shopId: shopId,
          itemId: item.id,
        }),
      );
    } else {
      let valueNum = quantity - 1;
      setQuantity(valueNum);
      dispatch(
        cartSlice.actions.setQuantity({
          shopId: shopId,
          itemId: item.id,
          quantity: valueNum,
        }),
      );
    }
  };
  return (
    <View
      className="flex-row bg-white mb-4"
      style={{ height: heightItem, width: widthItem, zIndex: 1, overflow: 'visible' }}
    >
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: '#ffffffe4' }}>
          <Dialog.Title>
            <Text className="font-hnow65medium text-xl">Topping nè</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text className="font-hnow64regular text-sm">{toppingString}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Hủy</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Modal
          visible={openNote}
          onDismiss={handleHideNote}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <ScrollView
            style={{
            }}
          >
            <View className="items-center flex-1">
              <Text className="text-center text-lg font-hnow64regular">Ghi chú cho quán nào</Text>
              <Divider style={{ width: '100%', marginVertical: 20 }} />
            </View>
            <View style={{ minHeight: 200, flex: 1 }}>
              <TextInput
                placeholder="Ghi chú tại đây ..."
                onContentSizeChange={(event) => {
                  setHeightNote(event.nativeEvent.contentSize.height);
                }}
                 
                numberOfLines={10}
                multiline
                defaultValue={noteTemp}
                onChangeText={(e) => setNoteTemp(e)}
                style={{
                  height: heightNote,
                  lineHeight: 28, // <- set the max height here
                }}
              />
            </View>
            <View className="flex-row justify-end items-center">
              <Button
                onPress={() => {
                  setOpenNote(false);
                }}
                textColor="red"
              >
                Hủy
              </Button>
              <Button onPress={handleSaveNote}>Lưu</Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <View className="bg-white rounded-2xl" style={styles.shadow}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          className="rounded-2xl bg-white"
          style={{
            height: heightItem,
            width: heightItem,
          }}
        />
      </View>
      <View className="ml-3 flex-1 justify-between">
        <View className="">
          <View className="flex-row justify-between items-center ">
            <Text className="p-0 m-0 font-hnow65medium" style={{ fontSize: 16 }}>
              {item.name}
            </Text>
            <IconButton
              className="m-0"
              onPress={handleRemoveItem}
              icon="close"
              size={20}
              iconColor={Colors.primaryBackgroundColor}
            />
          </View>
          <TouchableRipple onPress={() => setVisible(true)} borderless>
            <View>
              <Text
                numberOfLines={2}
                className="text-gray-600 text-ellipsis font-hnow63book text-xs"
              >
                {toppingString}
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <View className="">
          <TouchableRipple borderless onPress={handleOpenNote}>
            <View className="flex-row gap-2">
              <NotebookPen color={'#000000'} size={16} />
              <Text className="text-gray-600 text-ellipsis text-xs" numberOfLines={1}>
                {itemInCart.note ? itemInCart.note : 'Thêm ghi chú...'}
              </Text>
            </View>
          </TouchableRipple>
          <View className=" justify-between items-end flex-row">
            <Text className="text-sm text-primary font-hnow63book">
              {formatNumberVND(item.price)}
            </Text>
            <View className="flex-row justify-between items-center">
              <IconButton
                icon={'minus'}
                className="m-0 p-0 "
                mode="outlined"
                size={8}
                onPress={handleDecreaseQuantity}
                style={{ borderColor: 'red' }}
                iconColor={Colors.primaryBackgroundColor}
              />
              <TextInput
                value={`${quantity}`}
                multiline={true}
                onBlur={handleBlurInputQuantity}
                onChangeText={handleChangeQuantity}
                style={{ fontSize: 14, width: 30 }}
                textAlign="center"
                textAlignVertical="center"
              />
              <IconButton
                icon={'plus'}
                size={8}
                onPress={() => handleChangeQuantity(quantity + 1)}
                style={{ borderColor: 'red' }}
                className="m-0 p-0 bg-primary"
                mode="outlined"
                iconColor={Colors.commonBtnText}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemInCart;
