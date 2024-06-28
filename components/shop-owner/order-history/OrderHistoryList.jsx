import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../../api/api';
import { Colors } from '../../../constant';
import { formatDateToSeconds } from '../../../utils/MyUtils';
import OrderHistoryDetail from './OrderHistoryDetail';

const OrderHistoryList = ({ item, isActiveTab }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState({});

  const orderDetail = async (orderId) => {
    try {
      const res = await api.get(`/api/v1/customer/order/${orderId}`);
      console.log('res.data.value', res.data.value);
      setOrderDetailData(res.data.value);
      console.log('abs', orderDetailData);
    } catch (err) {
      console.log(err, '>>> error in getOrdersDetail');
      return null;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-3 shadow-md shadow-gray-400 bg-white rounded-xl">
          <TouchableOpacity
            onPress={() => {
              setIsShowDetail(true);
              orderDetail(item.id);
            }}
          >
            <View className="flex flex-row justify-between items-center">
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text className="font-bold text-xl">Mã đơn VFD{item.id}</Text>
                </View>
                {isActiveTab === 4 ? (
                  <Text className="text-base w-64 text-green-500">
                    VFD{item.id} giao dịch thành công
                  </Text>
                ) : (
                  <Text className="text-base w-64 text-red-500">
                    VFD{item.id} giao dịch thất bại
                  </Text>
                )}

                <Text style={{ fontSize: 14, color: 'slategray' }}>
                  {formatDateToSeconds(item.createdDate)}
                </Text>
              </View>
              <Button
                buttonColor={Colors.primaryBackgroundColor}
                textColor={Colors.commonBtnText}
                theme={{ roundness: 2 }}
                style={{ height: 40, paddingHorizontal: 8 }}
                onPress={() => {
                  setIsShowDetail(true);
                  orderDetail(item.id);
                }}
              >
                Chi tiết
              </Button>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={isShowDetail}
        onRequestClose={() => setIsShowDetail(false)}
        animationType="slide"
      >
        <OrderHistoryDetail
          handleClose={() => setIsShowDetail(false)}
          orderDetailData={orderDetailData}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default OrderHistoryList;
