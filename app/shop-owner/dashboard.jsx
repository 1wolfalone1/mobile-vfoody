import { DrawerLayoutAndroid, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ArrowUp,
  CircleUser,
  DollarSign,
  Menu,
  NotepadText,
  TrendingUp,
} from 'lucide-react-native';
import DashboardDrawerContent from '../../components/shopOwner/DashboardDrawerContent';
import DashboardCard from '../../components/shopOwner/DashboardCard';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { BlurView } from 'expo-blur';

const Dashboard = () => {
  const [fromDate, setFromDate] = useState(dayjs(dayjs('2024-02-01')));
  const [toDate, setToDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState([fromDate, toDate]);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
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
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <DashboardDrawerContent />}
    >
      <View>
        {/* Header */}
        <View className="flex-row items-center justify-between py-2 px-5">
          <Menu size={36} color="#DF4830" onPress={openDrawer} />
          <View className="flex-col items-center">
            <Text className="text-[18px] font-semibold">Tiệm ăn tháng năm</Text>
            <Text className="text-[12px] text-slate-500">Tòa S1.01 VinHome</Text>
          </View>
          <View className="bg-[#008542] rounded-xl px-6 py-3 shadow-xl">
            <Text className="text-white font-semibold">On</Text>
          </View>
        </View>

        {/* Filter Date */}
        <View className="flex-row justify-around my-2.5">
          <TouchableOpacity
            onPress={toggleFromDatePicker}
            className="bg-green-800 py-2 px-2 rounded-xl"
          >
            <Text className="text-white text-lg">From: {fromDate.format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleToDatePicker}
            className="bg-green-800  py-2 px-2 rounded-xl"
          >
            <Text className="text-white text-lg">To: {toDate.format('DD/MM/YYYY')}</Text>
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
                minDate={dayjs('2024-02-01').toDate()}
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
          mainIcon={<TrendingUp size={40} color="#68caa8" />}
          title="292M"
          subTitle="Total Revenue"
          leftIcon={<ArrowUp size={20} color="#065b1a" />}
          leftText={`12% (${numberOfDays} ${numberOfDays === 1 ? 'day' : 'days'})`}
        />
        <DashboardCard
          mainIcon={<DollarSign size={40} color="#68caa8" />}
          title="43M"
          subTitle="Total Profit"
          leftIcon={<ArrowUp size={20} color="#065b1a" />}
          leftText={`53% (${numberOfDays} ${numberOfDays === 1 ? 'day' : 'days'})`}
        />
        <DashboardCard
          mainIcon={<NotepadText size={40} color="#68caa8" />}
          title="1.052"
          subTitle="Total Orders  "
          leftIcon={<ArrowUp size={20} color="#065b1a" />}
          leftText={`32% (${numberOfDays} ${numberOfDays === 1 ? 'day' : 'days'})`}
        />
        <DashboardCard
          mainIcon={<CircleUser size={40} color="#68caa8" />}
          title="2.152"
          subTitle="Total Users"
          leftIcon={<ArrowUp size={20} color="#065b1a" />}
          leftText={`33% (${numberOfDays} ${numberOfDays === 1 ? 'day' : 'days'})`}
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
