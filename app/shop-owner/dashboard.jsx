import { DrawerLayoutAndroid, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CircleUser,
  DollarSign,
  Menu,
  NotepadText,
  TrendingUp,
} from 'lucide-react-native';
import DashboardDrawerContent from '../../components/shop-owner/DashboardDrawerContent';
import DashboardCard from '../../components/shop-owner/DashboardCard';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-paper';
import { Colors } from '../../constant';

const Dashboard = () => {
  const [fromDate, setFromDate] = useState(dayjs(dayjs('2024-02-01')));
  const [toDate, setToDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState([fromDate, toDate]);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const drawerRef = useRef(null);
  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };
  const toggleFromDatePicker = () => {
    setFromDatePickerVisibility(!isFromDatePickerVisible);
  };
  const toggleToDatePicker = () => {
    setToDatePickerVisibility(!isToDatePickerVisible);
  };
  const calculateDays = (start, end) => {
    return end.diff(start, 'day');
  };
  const numberOfDays = calculateDays(fromDate, toDate);

  const handleActive = () => {
    setIsActive(!isActive);
  }

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <DashboardDrawerContent />}
      className="mt-4"
    >
      <View>
        {/* Header */}
        <View className="flex-row items-center justify-between py-2 px-5">
          <Menu size={36} color={Colors.primaryBackgroundColor} onPress={openDrawer} />
          <View className="flex-col">
            <Text className="text-[18px] font-semibold">Tiệm ăn tháng năm</Text>
            <Text className="text-[12px] text-slate-500">Tòa S1.01 VinHome</Text>
          </View>
          <View>
            <Button
              type="contained"
              mode="contained"
              buttonColor={isActive ? Colors.success : Colors.primaryBackgroundColor}
              className="w-20 rounded-xl"
              labelStyle={{
                fontSize: 16,
              }}
              onPress={() => handleActive()}
            >
              {isActive ? 'On' : 'Off'}
            </Button>
          </View>
        </View>

        {/* Filter Date */}
        <View className="flex-row justify-around my-8">
          <TouchableOpacity onPress={toggleFromDatePicker} className="bg-slate-300 p-2 rounded-xl">
            <Text className="text-black text-lg">Từ ngày: {fromDate.format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleToDatePicker} className="bg-slate-300 p-2 rounded-xl">
            <Text className="text-black text-lg">Đến ngày: {toDate.format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
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
          leftIcon={<ArrowDown size={30} color={Colors.loss} />}
          leftText={`12% (${numberOfDays} ngày)`}
        />
        <DashboardCard
          mainIcon={<DollarSign size={30} color={Colors.success} />}
          title="Tổng lợi nhuận"
          subTitle="53,827,912.96 VNĐ"
          leftIcon={<ArrowUp size={30} color={Colors.success} />}
          leftText={`53% (${numberOfDays} ngày)`}
        />
        <DashboardCard
          mainIcon={<NotepadText size={30} color={Colors.success} />}
          title="Tổng đơn hàng"
          subTitle="18,917"
          leftIcon={<ArrowDown size={30} color={Colors.loss} />}
          leftText={`32% (${numberOfDays} ngày)`}
        />
        <DashboardCard
          mainIcon={<CircleUser size={30} color={Colors.success} />}
          title="Tổng khách hàng"
          subTitle="15,821"
          leftIcon={<ArrowUp size={30} color={Colors.success} />}
          leftText={`33% (${numberOfDays} ngày)`}
        />
      </View>
    </DrawerLayoutAndroid>
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
