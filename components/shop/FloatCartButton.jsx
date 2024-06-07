import { router } from 'expo-router';
import { ShoppingBasket } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constant';
import { cartSelector } from '../../redux/slice/cartSlice';
import globalSlice from '../../redux/slice/globalSlice';
import { dataShopDetailsSelector } from '../../redux/slice/shopDetailsSlice';
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 8 },
    shadowColor: Colors.shadow[400],

    shadowOpacity: 0.1,
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
const FloatCartButton = () => {
  const { items } = useSelector(cartSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const [cartQuantity, setCartQuantity] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartQuantity(items[info?.id]?.length);
    console.log(items, ' cart info');
  }, [items]);
  const handleOpenTempCart = () => {
    if (items[info?.id]) {
      router.push('/shop/temp-cart');
    } else {
      dispatch(
        globalSlice.actions.customSnackBar({
          style: {
            color: 'white',
            backgroundColor: Colors.glass[100],
            pos: {
              top: 40,
            },
            actionColor: 'yellow',
          },
        }),
      );
      dispatch(
        globalSlice.actions.openSnackBar({ message: 'Không có sản phẩm nào trong giỏ hàng' }),
      );
    }
  };
  return (
    <View
      className="absolute right-4 bottom-5 rounded-full bg-glass-100 p-3"
      style={{ ...styles.shadow, zIndex: 10000 }}
    >
      <TouchableRipple borderless className="rounded-full" onPress={handleOpenTempCart}>
        <View className="rounded-full">
          <ShoppingBasket size={30} color={'yellow'} />
        </View>
      </TouchableRipple>
      {!cartQuantity ? (
        <></>
      ) : (
        <Badge
          size={22}
          style={{
            backgroundColor: 'black',
            color: 'yellow',
          }}
          className="absolute right-[-4] top-[-3] z-1000 "
        >
          {cartQuantity}
        </Badge>
      )}
    </View>
  );
};

export default FloatCartButton;
