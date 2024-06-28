import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Appbar, Button, Dialog, Divider } from 'react-native-paper';
import api from '../../../api/api';
import { Colors } from '../../../constant';
import { formatNumberVND, formatPhoneNumber } from '../../../utils/MyUtils';
import colors from '../../../constant/colors';
import { useDispatch, useSelector } from 'react-redux';
import persistSlice, { persistSliceSelector } from '../../../redux/slice/persistSlice';

const ShowDetailOrder = ({ handleClose, orderDetailData, isActiveTab }) => {
  const [isDeleteDialog, setIsDeleteDialog] = React.useState(false);
  const dispatch = useDispatch();
  const { isRefreshOrder } = useSelector(persistSliceSelector);
  console.log('isRefreshOrder', isRefreshOrder);

  const handleReject = async (orderId) => {
    try {
      setIsDeleteDialog(false);
      handleClose();
      // handle reject order
    } catch (err) {
      console.log(err, '>>> error in confirmed order');
    }
  };

  const handleConfirm = async (orderId) => {
    try {
      const res = await api.put(`/api/v1/shop/order/${orderId}/confirmed`);
      console.log('ressssss', res.data.value);
      if (res.data.isSuccess) {
        handleClose();
        dispatch(persistSlice.actions.saveisRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in confirmed order');
    }
  };

  const handleReady = async (orderId) => {
    try {
      const res = await api.put(`/api/v1/shop/order/${orderId}/delivering`);
      console.log('ressssss', res.data.value);
      if (res.data.isSuccess) {
        handleClose();
        dispatch(persistSlice.actions.saveisRefreshOrder(!isRefreshOrder));
      }
    } catch (err) {
      console.log(err, '>>> error in delivering order');
    }
  };
  const handleCompleted = async (orderId) => {
    try {
      // handle successful order
      // const res = await api.put(`/api/v1/shop/order/${orderId}/confirmed`);
      // console.log('ressssss', res.data.value);
      // if (res.data.isSuccess) {
      //   handleClose();
      // }
    } catch (err) {
      console.log(err, '>>> error in confirmed order');
    }
  };

  return (
    <ScrollView>
      <Appbar.Header className="px-5 mb-4">
        <MaterialIcons
          name="arrow-back-ios-new"
          size={36}
          color={Colors.primaryBackgroundColor}
          onPress={handleClose}
        />
        <Text className="font-bold text-xl pl-20">Đơn hàng chi tiết</Text>
      </Appbar.Header>
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
              // onPress={() => handleCancel()}
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
              // onPress={() => handleCancel()}
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

      <Dialog
        className="bg-slate-100"
        visible={isDeleteDialog}
        onDismiss={() => setIsDeleteDialog(false)}
      >
        <Dialog.Title>Cảnh báo</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Bạn có chắc chắn muốn hủy đơn này không?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            className="px-5"
            mode="elevated"
            textColor={colors.primaryBackgroundColor}
            onPress={() => setIsDeleteDialog(false)}
          >
            Từ chối
          </Button>
          <Button
            mode="contained"
            className="px-5"
            buttonColor={Colors.primaryBackgroundColor}
            onPress={() => handleReject(orderDetailData.orderInfo.orderId)}
          >
            Đồng ý
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};

export default ShowDetailOrder;
