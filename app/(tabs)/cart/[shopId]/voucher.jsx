import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import ActiveVoucher from '../../../../components/cart-page/ActiveVoucher';
import InactiveVoucher from '../../../../components/cart-page/InactiveVoucher';
import orderSlice, { getListVoucher, orderSelector } from '../../../../redux/slice/orderSlice';
import { dataShopDetailsSelector } from '../../../../redux/slice/shopDetailsSlice';
import { userInfoSliceSelector } from '../../../../redux/slice/userSlice';

const VoucherPage = () => {
  const { ship, listVoucher, voucher } = useSelector(orderSelector);
  const dispatch = useDispatch();
  const { info } = useSelector(dataShopDetailsSelector);
  const userInfo = useSelector(userInfoSliceSelector);
  useEffect(() => {
    console.log(listVoucher, ' listafttttttttttt');
    dispatch(
      getListVoucher({
        userId: userInfo.id,
        shopId: info?.id,
        distance: parseInt(ship.distance),
      }),
    );
    return () => {
      dispatch(orderSlice.actions.resetListVoucher());
    };
  }, []);
  return (
    <View className="flex-1" style={{ backgroundColor: 'white' ,paddingTop: 16 }}>
      <View className="items-center px-3">
        <Text className="font-bold text-2xl">Khuyến mãi~</Text>
        <Divider className="h-[1] w-full my-4" />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator
        showsVerticalScrollIndicator
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 12,
          
        }}
      >
        <View className=" flex-1">
          <Text className="font-hnow64regular text-lg text-gray-700 ">Chọn 1 voucher nào</Text>
          <Divider className="h-[1] w-full my-4" />
          <RadioButton.Group
            value={voucher.id}
            className=" w-full bg-black-100"
            onValueChange={(value) => {
              dispatch(orderSlice.actions.changeVoucher(value));
            }}
          >
            {listVoucher.active.map((item) => (
              <ActiveVoucher item={item} key={uuid.v4()} />
            ))}
          </RadioButton.Group>
        </View>

        <View className=" flex-1">
          <Divider className="h-[1] w-full my-4" />
          <Text className="font-hnow64regular text-lg text-gray-700 ">
            Voucher không đủ điều kiện
          </Text>
          <Divider className="h-[1] w-full my-4" />
          {listVoucher.inactive.map((item) => (
            <InactiveVoucher item={item} key={uuid.v4()} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VoucherPage;
