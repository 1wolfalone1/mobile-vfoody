import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CircleUser,
  DollarSign,
  NotepadText,
  TrendingUp,
} from 'lucide-react-native';
import DashboardDrawerContent from '../../components/shop-owner/DashboardDrawerContent';
import DashboardCard from '../../components/shop-owner/DashboardCard';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import { Button, TouchableRipple } from 'react-native-paper';
import { Colors } from '../../constant';
import CustomDrawer from '../../components/CustomDrawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '../../components/shop-owner/DashboardHeader';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Dashboard = () => {
  const [openDrawerDashboard, setOpenDrawerDashboard] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs(dayjs('2024-01-01')));
  const [toDate, setToDate] = useState(dayjs(Date.now()));
  const [dateRange, setDateRange] = useState([fromDate, toDate]);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const calculateDays = (start, end) => {
    return end.diff(start, 'day');
  };
  const numberOfDays = calculateDays(fromDate, toDate);
  const [date, setDate] = useState(numberOfDays);

  const toggleFromDatePicker = () => {
    setFromDatePickerVisibility(!isFromDatePickerVisible);
  };
  const toggleToDatePicker = () => {
    setToDatePickerVisibility(!isToDatePickerVisible);
  };
  const handleActive = () => {
    setIsActive(!isActive);
  };
  const handleSubmit = () => {
    setDate(calculateDays(fromDate, toDate));
  };
  const handleOpenDashboardDrawer = () => {
    setOpenDrawerDashboard(true);
  };
  const handleCloseDashboardDrawer = () => {
    setOpenDrawerDashboard(false);
  };
  const renderDrawerContent = () => {
    return (
      <DashboardDrawerContent
        closeDrawer={handleCloseDashboardDrawer}
        openDrawerDashboard={openDrawerDashboard}
      />
    );
  };

  return (
    <CustomDrawer
      open={openDrawerDashboard}
      onOpen={handleOpenDashboardDrawer}
      onClose={handleCloseDashboardDrawer}
      renderDrawerContent={renderDrawerContent}
    >
      <SafeAreaView>
        {/* Header */}
        <DashboardHeader
          setOpenDrawerDashboard={setOpenDrawerDashboard}
          centerContent={
            <View className="flex-col items-center">
              <Text className="text-[18px] font-semibold">Tiệm ăn tháng năm</Text>
              <Text className="text-[12px] text-slate-500">Tòa S1.01 VinHome</Text>
            </View>
          }
          rightContent={
            <View className="flex-row ">
              <TouchableRipple
                onPress={() => router.push('chat')}
                className="rounded-full"
                style={{
                  borderRadius: 1000,
                }}
                borderless
              >
                <View className="" style={{ backgroundColor: '#8f88883a', padding: 8 }}>
                  <Ionicons name="chatbubble-ellipses" size={24} color={Colors.blue[100]} />
                </View>
              </TouchableRipple>
            </View>
            // <View>
            //   <Button
            //     type="contained"
            //     mode="contained"
            //     buttonColor={isActive ? Colors.success : Colors.primaryBackgroundColor}
            //     className="w-20 rounded-xl"
            //     labelStyle={{
            //       fontSize: 18,
            //     }}
            //     onPress={() => handleActive()}
            //   >
            //     {isActive ? 'On' : 'Off'}
            //   </Button>
            // </View>
          }
        />

        {/* Content */}
        <Text className="text-2xl font-bold justify-center py-8 text-center tracking-wider text-primary">
          Thống kê tổng quan về shop
        </Text>

        {/* Filter date */}
        <View className="flex-row justify-around mb-4 mx-2">
          {/* Date:To */}
          <View className="flex-col w-1/2 px-2">
            <TouchableRipple onPress={toggleFromDatePicker} className="bg-slate-300 p-2 rounded-md">
              <Text className="text-black mx-2 text-lg">Từ: {fromDate.format('DD/MM/YYYY')}</Text>
            </TouchableRipple>
          </View>

          {/* Date:To */}
          <View className="flex-col w-1/2 px-2">
            {/* <Text className="text-gray-500  text-sm"></Text> */}
            <TouchableRipple onPress={toggleToDatePicker} className="bg-slate-300 p-2 rounded-md">
              <Text className="text-black mx-2 text-lg">Đến: {toDate.format('DD/MM/YYYY')}</Text>
            </TouchableRipple>
          </View>
        </View>

        <View className="px-4">
          <Button
            buttonColor={Colors.primaryBackgroundColor}
            textColor={Colors.commonBtnText}
            mode="elevated"
            contentStyle={{
              paddingVertical: 4,
            }}
            className="rounded-md"
            labelStyle={{
              fontSize: 18,
            }}
            onPress={handleSubmit}
          >
            Xem thống kê
          </Button>
        </View>

        {/* From Date Picker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFromDatePickerVisible}
          onRequestClose={() => setFromDatePickerVisibility(false)}
        >
          <BlurView intensity={50} style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <DateTimePicker
                minDate={dayjs('2024-01-01').toDate()}
                maxDate={toDate.toDate()}
                mode="single"
                startDate={fromDate.toDate()}
                endDate={toDate.toDate()}
                locale="vi-VN"
                date={fromDate.toDate()}
                onChange={(params) => {
                  setFromDate(dayjs(params.date));
                  setDateRange([dayjs(params.date), dateRange[1]]);
                  setFromDatePickerVisibility(false);
                }}
              />
            </View>
          </BlurView>
        </Modal>

        {/* To Date Picker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isToDatePickerVisible}
          onRequestClose={() => setToDatePickerVisibility(false)}
        >
          <BlurView intensity={50} style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <DateTimePicker
                minDate={fromDate.toDate()}
                maxDate={dayjs().toDate()}
                mode="single"
                startDate={fromDate.toDate()}
                endDate={toDate.toDate()}
                locale="vi-VN"
                date={toDate.toDate()}
                onChange={(params) => {
                  setToDate(dayjs(params.date));
                  setToDatePickerVisibility(false);
                }}
              />
            </View>
          </BlurView>
        </Modal>

        {/* NavLink */}
        <DashboardCard
          mainIcon={<TrendingUp size={30} color={Colors.success} />}
          title="Tổng doanh thu"
          subTitle="89,972,872.85 VNĐ"
          leftIcon={<ArrowUp size={30} color={Colors.success} />}
          leftText={`12% (${date} ngày)`}
        />
        <DashboardCard
          mainIcon={<NotepadText size={30} color={Colors.success} />}
          title="Tổng đơn hàng"
          subTitle="18,917"
          leftIcon={<ArrowDown size={30} color={Colors.loss} />}
          leftText={`32% (${date} ngày)`}
        />
        <DashboardCard
          mainIcon={<CircleUser size={30} color={Colors.success} />}
          title="Tổng khách hàng"
          subTitle="15,821"
          leftIcon={<ArrowUp size={30} color={Colors.success} />}
          leftText={`33% (${date} ngày)`}
        />
      </SafeAreaView>
    </CustomDrawer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  drawerText: {
    color: 'white',
    backgroundColor: '#DF4830',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datePickerButton: {
    backgroundColor: '#065b1a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  datePickerText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
