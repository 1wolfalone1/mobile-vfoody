import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import api from '../../../api/api';
import ItemBestSellerInHome from '../../../components/user-page/ItemBestSellerInHome';
import ItemShopRegulerInHome from '../../../components/user-page/ItemShopRegulerInHome';
import { Colors } from '../../../constant';
import { userInfoSliceSelector } from '../../../redux/slice/userSlice';
const Index = () => {
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

  const [dataTopShop, setDataTopShop] = useState({});

  const [idCategorySelected, setCategorySelected] = useState(1);
  const [dataTopProduct, setDataTopProduct] = useState({});
  const [categories, setCategories] = useState([]);
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

  return (
    <>
      <View className="flex-1">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row  gap-5 p-5  pl-7">
            {categories.map((item, index) => (
              <TouchableRipple
                onPress={() => {
                  setCategorySelected(item.id);
                }}
                rippleColor="rgba(252, 91, 91, 0.178)"
                key={item.id}
              >
                <View
                  style={{
                    ...(idCategorySelected == item.id ? styles.shadowSelected : styles.shadow),
                  }}
                  className={`flex justify-start items-center rounded-full 
                   ${'bg-white'} w-[60] h-full`}
                >
                  <View className="">
                    <Image
                      source={{
                        uri: item.imageUrl,
                      }}
                      className="rounded-full  border-solid border-primary"
                      resizeMode="cover"
                      style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        height: widthCategory,
                        width: widthCategory,
                      }}
                    />
                  </View>
                  <View className="w-[40] pb-2 mt-2 justify-center items-center">
                    <Text
                      // className="font-hnow64regular flex flex-wrap over"
                      className={`${'text-black'} font-hnow63book justify-center items-center text-center`}
                      style={{
                        fontSize:8,
                        lineHeight: 15,
                        flexWrap: 'wrap',
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableRipple>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="pl-7">
        <Text className="font-hnow65medium text-xl text-primary">Bán chạy nhất</Text>
      </View>
      <View className="flex-1 ">
        <View className="flex-row mt-2  ">
          <FlatList
            contentContainerStyle={{ paddingLeft: 28 }}
            horizontal
            data={dataTopProduct}
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
            data={dataTopShop}
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
