import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Colors } from '../../../constant';
import { formatNumberVND, formatPhoneNumber } from '../../../utils/MyUtils';

const OrderHistoryDetail = ({ handleClose, orderDetailData }) => {
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
      <View className="px-8 py-4 shadow-md shadow-gray-400 bg-white rounded-xl flex-1 flex-col justify-between">
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
            {orderDetailData?.orderInfo?.orderStatus === 4 ? (
              <Text className="text-base">
                Trạng thái đơn hàng: <Text className="font-bold text-green-500">Thành công</Text>
              </Text>
            ) : (
              <View>
                <Text className="text-base">
                  Trạng thái đơn hàng: <Text className="font-bold text-red-500">Thất bại</Text>
                </Text>
                <Text className="text-base">
                  Lý do thất bại: <Text className=" text-red-500">Đặt nhầm địa chỉ</Text>
                </Text>
              </View>
            )}

            <Divider className="my-4" bold />
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
                <Divider className="my-3" />
              </View>
            ))}
            {orderDetailData.orderInfo?.note && (
              <View>
                <Text className="font-bold">Ghi chú thêm: </Text>
                <Text className="text-primary">{orderDetailData.orderInfo?.note}</Text>
              </View>
            )}
            <Divider className="my-4" bold />
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
            <View className="flex flex-row justify-end mt-2">
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
      </View>
    </ScrollView>
  );
};

export default OrderHistoryDetail;
