import { BASE_URL } from '@env';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import api from '../../../api/api';
import CategoryItemInHome from '../../../components/user-page/CategoryItemInHome';
import ItemBestSellerInHome from '../../../components/user-page/ItemBestSellerInHome';
import ItemShopRegulerInHome from '../../../components/user-page/ItemShopRegulerInHome';
import { Colors } from '../../../constant';
import { userInfoSliceSelector } from '../../../redux/slice/userSlice';

const Index = () => {
  console.log(BASE_URL, 'Base url home');
  const { width, height } = Dimensions.get('window');
  const widthCategory = parseInt((width * 15) / 100);
  const userData = useSelector(userInfoSliceSelector);
  const styles = StyleSheet.create({
    shadow: {
      shadowOffset: { width: 5, height: 8 },
      shadowColor: Colors.shadow[300],

      shadowOpacity: 0.1,
      elevation: 6,
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

  const [dataTopShop, setDataTopShop] = useState(null);

  const [idCategorySelected, setCategorySelected] = useState(1);
  const [dataTopProduct, setDataTopProduct] = useState(null);
  const [categories, setCategories] = useState(null);
  const handleGetCategories = async () => {
    try {
      const res = await api.get('/api/v1/category');
      const data = await res.data;
      setCategories(data.value);
      console.log(data.value, ' category');
    } catch (err) {
      console.log(err, ' error in DynamicHeader');
    }
  };

  const handleGetDataTopProduct = async () => {
    try {
      const res = await api.get('/api/v1/customer/product/top');
      const data = await res.data;
      console.log(data, ' data ItemBestSellerInHome');
      setDataTopProduct(data.value.items);
    } catch (err) {
      console.log(err, ' error in ItemBestSellerInHome');
    }
  };

  const handleGetDataTopShop = async () => {
    try {
      const res = await api.get('/api/v1/customer/shop/top');
      const data = await res.data;
      console.log(data, ' data in ItemShop');
      setDataTopShop(data.value.items);
    } catch (err) {
      console.log(err, ' error in ItemShopRegulerInHome ');
    }
  };
  useEffect(() => {
    handleGetDataTopShop();
    handleGetDataTopProduct();
    handleGetCategories();
  }, []);
  useEffect(() => {
    console.log(userData, ' teset');
  }, [userData]);
  const blankData = [null, null, null, null, null];
  return (
    <>
      <View className="flex-1">
        <View className="flex-row mt-2">
          <FlatList
            contentContainerStyle={{ paddingLeft: 28, paddingVertical: 8 }}
            horizontal
            data={categories ? categories : blankData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryItemInHome
                item={item}
                idCategorySelected={idCategorySelected}
                setCategorySelected={setCategorySelected}
              />
            )}
          />
        </View>
      </View>
      <View className="pl-7">
        <Text className="font-hnow65medium text-xl text-primary">Bán chạy nhất</Text>
      </View>
      <View className="flex-1 ">
        <View className="flex-row mt-2">
          <FlatList
            contentContainerStyle={{ paddingLeft: 28 }}
            horizontal
            removeClippedSubviews={true}
            data={dataTopProduct ? dataTopProduct : blankData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ItemBestSellerInHome item={item} />}
          />
        </View>
      </View>
      <View className="pl-7">
        <Text className="font-hnow65medium text-xl text-primary">Đặt lại quán quen</Text>
      </View>
      <View className="flex-1 ">
        <View className="flex-row mt-2  ">
          <FlatList
            contentContainerStyle={{ paddingLeft: 28 }}
            horizontal
            data={dataTopShop ? dataTopShop : blankData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ItemShopRegulerInHome item={item} />}
          />
        </View>
      </View>
      <View className="pl-7">
        <Text className="font-hnow65medium text-xl text-primary">Đặt hàng ngay!!!</Text>
      </View>
      <View className="flex-1 ">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
          <View className="flex-row  pl-7 mt-2  ">
            {Data2.map((item, index) => (
              <View
                key={item.id}
                className={`flex justify-start items-center bg-white w-[270] rounded-2xl  mr-5 mb-10`}
                style={styles.shadow}
              >
                <View className="w-full h-[170] bg-black-100 flex-1 overflow-hidden rounded-t-2xl">
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
                <View className="p-3 items-start w-full">
                  <Text className="text-sm font-hnow65medium">{item.t}</Text>
                  <View className="flex-row gap-2">
                    <Text className="text-xs text-gray-500 font-hnow65medium">Ad</Text>
                    <Text style className="text-xs text-gray-400 font-hnow64regular">
                      {item.Ad}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Index;
const data3 = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];
const Data2 = [
  {
    id: 1,
    t: 'Quán ngon giá hời',
    Ad: 'Cheese Food House',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/38da7d105303523.5f75e3e4e4fd7.jpg',
  },
  {
    id: 21,
    t: 'Quán ngon giá hời',
    Ad: 'Cheese Food House',
    image:
      'https://res.cloudinary.com/lush-banners/image/upload/v1570824624/lushbanners/blogs/restaurant-teardrop-banners.jpg',
  },
];
const DATA = [
  {
    id: 1,
    title: 'Đồ ăn nhanh',
    image: '../../../assets/images/fastfood.png',
  },
  {
    id: 2,
    title: 'Đồ uống',
    image: '../../../assets/images/drink.png',
  },
  {
    id: 3,
    title: 'Mì phở',
    image: '../../../assets/images/noodle.png',
  },
  {
    id: 4,
    title: 'Bánh mì',
    image: '../../../assets/images/bread.png',
  },
  {
    id: 5,
    title: 'Chảo',
    image: '../../../assets/images/otherfood.png',
  },
];
