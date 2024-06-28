import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { Button, Dialog, Divider, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api/api';
import { Colors } from '../../../constant';
import colors from '../../../constant/colors';
import persistSlice, { persistSliceSelector } from '../../../redux/slice/persistSlice';
import { formatNumberVND, formatPhoneNumber } from '../../../utils/MyUtils';

const ShowDetailOrder = ({ handleClose, orderDetailData, isActiveTab }) => {
  const [isDeleteDialog, setIsDeleteDialog] = React.useState(false);
  const dispatch = useDispatch();
  const { isRefreshOrder } = useSelector(persistSliceSelector);
  const [reason, setReason] = useState('');
  const [isError, setIsError] = useState(false);

  const handleDismiss = () => {
    setReason('');
    setIsDeleteDialog(false);
    setIsError(false);
  };

  // don moi -> huy don -> dong y
  const handleReject = async (orderId) => {
    if (!reason) {
      setIsError(true);
      return;
    }
    const payload = {
      reason: reason,
    };
    try {
      const res = await api.put(`api/v1/shop/order/${orderId}/reject`, payload);
      if (res.data.isSuccess) {
        setIsDeleteDialog(false);
        handleClose();
        dispatch(persistSlice.actions.saveIsRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in reject order');
    }
  };

  // don moi -> nhan don
  const handleConfirm = async (orderId) => {
    try {
      const res = await api.put(`/api/v1/shop/order/${orderId}/confirmed`);
      if (res.data.isSuccess) {
        handleClose();
        dispatch(persistSlice.actions.saveIsRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in confirmed order');
    }
  };

  // dang chuan bi -> san sang giao hang
  const handleReady = async (orderId) => {
    try {
      const res = await api.put(`/api/v1/shop/order/${orderId}/delivering`);
      console.log('ressssss', res.data.value);
      if (res.data.isSuccess) {
        handleClose();
        dispatch(persistSlice.actions.saveIsRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in delivering order');
    }
  };

  // dang chuan bi -> huy don -> dong y
  const handleCancel = async (orderId) => {
    if (!reason) {
      setIsError(true);
      return;
    }
    const payload = {
      reason: reason,
    };
    try {
      const res = await api.put(`api/v1/shop/order/${orderId}/cancel`, payload);
      if (res.data.isSuccess) {
        setIsDeleteDialog(false);
        handleClose();
        dispatch(persistSlice.actions.saveIsRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in cancel order');
    }
  };

  // dang giao -> hoan tat don hang
  const handleCompleted = async (orderId) => {
    try {
      const res = await api.put(`api/v1/shop/order/${orderId}/request-payment-link`);
      if (res.data.isSuccess) {
        const qrUrl = res.data.value.checkOutLink;
        console.log('qrUrl', qrUrl);
        Linking.openURL(qrUrl);
      }
    } catch (err) {
      console.log(err, '>>> error in completed order');
    }
  };

  // dang giao -> huy don -> dong y
  const handleFail = async (orderId) => {
    if (!reason) {
      setIsError(true);
      return;
    }
    const payload = {
      reason: reason,
    };
    try {
      const res = await api.put(`api/v1/shop/order/${orderId}/fail`, payload);
      if (res.data.isSuccess) {
        setIsDeleteDialog(false);
        handleClose();
        dispatch(persistSlice.actions.saveIsRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in cancel order');
    }
  };

  return (
    <ScrollView>
      <View className="flex flex-row py-4 items-center pl-5">
        <MaterialIcons
          name="arrow-back-ios-new"
          size={36}
          color={Colors.primaryBackgroundColor}
          onPress={() => {
            handleClose();
          }}
        />
        <Text className="font-bold text-xl pl-20">Đơn hàng chi tiết</Text>
      </View>
      <View className="p-8 shadow-md shadow-gray-400 bg-white rounded-xl flex-1 flex-col justify-between">
        <View>
          <View>
            <Text className="text-base">
              Tên khách hàng:{' '}
              <Text className="font-bold">{orderDetailData?.orderInfo?.fullName}</Text>
            </Text>
            <Text className="text-base">
              Số điện thoại nhận hàng:{' '}
              <Text className="font-bold">
                {formatPhoneNumber(orderDetailData?.orderInfo?.phoneNumber)}
              </Text>
            </Text>
            <Text className="text-base">
              Địa chỉ:{' '}
              <Text className="font-bold">{orderDetailData?.orderInfo?.building?.address}</Text>
            </Text>
            {orderDetailData?.orderInfo?.orderStatus === 1 ? (
              <Text className="text-base">
                Trạng thái: <Text className="font-bold text-yellow-500">Chờ xác nhận</Text>
              </Text>
            ) : orderDetailData?.orderInfo?.orderStatus === 2 ? (
              <Text className="text-base">
                Trạng thái: <Text className="font-bold text-blue-500">Đang chuẩn bị</Text>
              </Text>
            ) : (
              <Text className="text-base">
                Trạng thái: <Text className="font-bold text-teal-500">Đang giao hàng</Text>
              </Text>
            )}

            <Divider className="my-8" bold />
            {orderDetailData?.products?.map((item) => (
              <View>
                <View className="flex flex-row justify-between items-center">
                  <View className="w-60">
                    <View className="flex flex-row items-center">
                      <Image
                        source={{
                          uri: item.imageUrl,
                        }}
                        resizeMode="cover"
                        className="w-10 h-10"
                      />
                      <View className="flex flex-col ml-2">
                        <Text className="text-base mr-2">
                          {item.productName} ({formatNumberVND(item.productPrice)})
                        </Text>
                        <Text className="text-base font-bold">x{item.productQuantity}</Text>
                      </View>
                    </View>
                    <View>
                      {item.topping?.length > 0 && (
                        <View>
                          {item.topping.map(
                            (q) =>
                              q.options?.length > 0 && (
                                <>
                                  <Text className="font-bold text-slate-500 mt-4">
                                    {q.queDescription}:
                                  </Text>
                                  {q.options.map((option) =>
                                    option.optionPrice > 0 ? (
                                      <Text className="text-slate-500">
                                        - {option.opDescription} (+
                                        {formatNumberVND(option.optionPrice * item.productQuantity)}
                                        )
                                      </Text>
                                    ) : (
                                      <Text className="text-slate-500">
                                        - {option.opDescription}
                                      </Text>
                                    ),
                                  )}
                                </>
                              ),
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                  <Text className="font-bold text-base">
                    {formatNumberVND(item.totalProductPrice)}
                  </Text>
                </View>
                <Divider className="my-4" />
              </View>
            ))}
            {orderDetailData.orderInfo?.note && (
              <View>
                <Text className="font-bold">Ghi chú thêm: </Text>
                <Text className="text-primary">{orderDetailData.orderInfo?.note}</Text>
              </View>
            )}
            <Divider className="mt-16 mb-12" bold />
          </View>
          <View className="flex flex-col">
            <View className="flex flex-row justify-end">
              <Text className="text-base">
                Tổng hóa đơn: {formatNumberVND(orderDetailData.orderInfo?.totalPrice)}
              </Text>
            </View>
            <View className="flex flex-row justify-end">
              <Text className="text-base">
                Phí giao hàng: {formatNumberVND(orderDetailData.orderInfo?.shippingFee)}
              </Text>
            </View>
            <View className="flex flex-row justify-end">
              <Text className="text-base">
                Giảm giá: {formatNumberVND(orderDetailData?.orderInfo?.totalPromotion)}
              </Text>
            </View>
            <View className="flex flex-row justify-end">
              <Text className="text-xl font-bold text-primary">
                Thành tiền:{' '}
                {formatNumberVND(
                  orderDetailData.orderInfo?.totalPrice -
                    orderDetailData?.orderInfo?.totalPromotion,
                )}
              </Text>
            </View>
          </View>
        </View>

        {isActiveTab === 1 ? (
          <View className="flex flex-row justify-center gap-4 mt-12">
            <Button
              buttonColor={Colors.loss}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => setIsDeleteDialog(true)}
            >
              Hủy đơn
            </Button>
            <Button
              buttonColor={Colors.success}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => handleConfirm(orderDetailData.orderInfo.orderId)}
            >
              Nhận đơn
            </Button>
          </View>
        ) : isActiveTab === 2 ? (
          <View className="flex flex-row items-end justify-center gap-4 mt-4">
            <Button
              buttonColor={Colors.loss}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => setIsDeleteDialog(true)}
            >
              Hủy đơn
            </Button>
            <Button
              buttonColor={Colors.success}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => handleReady(orderDetailData.orderInfo.orderId)}
            >
              Đã sẵn sàng
            </Button>
          </View>
        ) : (
          <View className="flex flex-row items-end justify-center gap-4 mt-4">
            <Button
              buttonColor={Colors.loss}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => setIsDeleteDialog(true)}
            >
              Hủy đơn
            </Button>
            <Button
              buttonColor={Colors.success}
              textColor={Colors.commonBtnText}
              mode="elevated"
              theme={{ roundness: 2 }}
              contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 170,
              }}
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => handleCompleted(orderDetailData.orderInfo.orderId)}
            >
              Hoàn tất
            </Button>
          </View>
        )}
      </View>

      <Dialog className="bg-slate-100" visible={isDeleteDialog} onDismiss={handleDismiss}>
        <Dialog.Title>Lý do hủy đơn</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Nhập lý do"
            value={reason}
            onChangeText={setReason}
            mode="outlined"
            outlineStyle={{ borderRadius: 12 }}
            className="text-base"
            activeOutlineColor="#DF4830"
          />
          {!reason && isError && <Text className="text-red-500 mt-2">Vui lòng nhập lý do</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            className="px-5"
            mode="elevated"
            textColor={colors.primaryBackgroundColor}
            onPress={handleDismiss}
          >
            Từ chối
          </Button>
          <Button
            mode="contained"
            className="px-5"
            buttonColor={Colors.primaryBackgroundColor}
            onPress={() => {
              if (isActiveTab === 1) {
                console.log('asdabs');
                handleReject(orderDetailData.orderInfo.orderId);
              } else if (isActiveTab === 2) {
                handleCancel(orderDetailData.orderInfo.orderId);
              } else {
                handleFail(orderDetailData.orderInfo.orderId);
              }
            }}
          >
            Đồng ý
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default ShowDetailOrder;
