import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import SkeletonLoading from 'expo-skeleton-loading';
import { Feather } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import FloatCartButton from '../../components/shop/FloatCartButton';
import ToppingItem from '../../components/shop/ToppingItem';
import { Colors } from '../../constant';
import colors from '../../constant/colors';
import cartSlice from '../../redux/slice/cartSlice';
import globalSlice from '../../redux/slice/globalSlice';
import shopDetailsSlice, {
  dataShopDetailsSelector,
  getProductDetailsById,
} from '../../redux/slice/shopDetailsSlice';
import { formatNumberVND } from '../../utils/MyUtils';

const ProductDetail = () => {
  const { productId } = useLocalSearchParams();
  const { product } = useSelector(dataShopDetailsSelector);
  const { info } = useSelector(dataShopDetailsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetailsById(productId));
    return () => {
      dispatch(shopDetailsSlice.actions.resetProductDetails());
    };
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [toppingChecked, setToppingChecked] = useState(null);
  const [sauceChecked, setSauceChecked] = useState(null);

  const handleAddLike = () => {
    setIsLiked(!isLiked);
  };
  console.log(product, ' product detials in selector');
  const [totalOrder, setTotalOrder] = useState(product.total_order || 0);

  const handleDecrease = () => {
    if (totalOrder > 0) {
      setTotalOrder((prevTotalOrder) => Math.max(prevTotalOrder - 1, 0));
    }
  };
  const handleAddToCart = () => {
    if (totalOrder != 0) {
      dispatch(
        globalSlice.actions.customSnackBar({
          style: {
            color: 'white',
            icon: 'camera',
            backgroundColor: Colors.glass.green,
            pos: {
              top: 40,
            },
            actionColor: 'yellow',
          },
        }),
      );
      dispatch(globalSlice.actions.openSnackBar({ message: 'Add to Cart successfully' }));
      dispatch(
        cartSlice.actions.addToCart({
          productId: product.info.id,
          shopId: info.id,
          quantity: totalOrder,
          topping: product.toppingSelected,
        }),
      );
    } else {
      dispatch(
        globalSlice.actions.customSnackBar({
          style: {
            color: 'white',
            backgroundColor: Colors.glass.red,
            pos: {
              top: 40,
            },
            actionColor: 'yellow',
          },
        }),
      );
      dispatch(globalSlice.actions.openSnackBar({ message: 'Đơn hàng phải lớn hơn 0' }));
    }
  };
  const handleIncrease = () => {
    setTotalOrder((prevTotalOrder) => prevTotalOrder + 1);
  };

  return (
    <SafeAreaView className="flex-1">
      <FloatCartButton />
      {product.info == null ? (
        <SkeletonItem />
      ) : (
        <View className="flex-1">
          <ScrollView className="">
            <View className="flex-1 mx-8 mb-12">
              <Image
                className="h-48 rounded-lg"
                resizeMode="cover"
                source={{ uri: `${product.info.imageUrl}` }}
              />
              <View className="flex-row justify-between items-center flex-shrink: 0">
                <Text className="text-3xl font-bold mt-4">{product.info.name}</Text>
                <TouchableRipple
                  key={product.info.id}
                  onPress={() => handleAddLike()}
                  rippleColor={colors.primaryTextColor}
                >
                  <View>
                    {isLiked ? (
                      <AntDesign name="heart" size={24} color="red" />
                    ) : (
                      <AntDesign name="hearto" size={24} color="black" />
                    )}
                  </View>
                </TouchableRipple>
              </View>
              <View className="flex-row items-center my-1">
                <AntDesign name="star" size={24} style={{ color: '#FFC529' }} />
                <Text className="font-bold ml-1">4.5</Text>
                <Button
                  labelStyle={{
                    color: Colors.btnText,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => router.push('/review')}
                >
                  Đánh giá
                </Button>
              </View>

              <View className="flex-row justify-between">
                <Text
                  style={{ color: colors.primaryBackgroundColor }}
                  className="font-hnow64regular text-xl"
                >
                  {formatNumberVND(product.info.price)}
                </Text>
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={handleDecrease}>
                    <Feather name="minus-circle" size={30} color={colors.primaryBackgroundColor} />
                  </TouchableOpacity>
                  <Text className="font-bold mx-2 text-lg">{totalOrder}</Text>
                  <TouchableOpacity onPress={handleIncrease}>
                    <Ionicons name="add-circle" size={32} color={colors.primaryBackgroundColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-gray-500 my-4">{product.info.description}</Text>

              <View className="flex-1">
                {product.topping.map((item, index) => (
                  <ToppingItem topping={item} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <View className="flex mb-4 w-full items-center absolute bottom-0">
        <Button
          textColor="white"
          mode="elevated"
          buttonColor={Colors.primaryBackgroundColor}
          className="rounded-full items-center"
          labelStyle={{
            padding: 2,
          }}
          icon="shopping"
          onPress={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
const SkeletonItem = () => {
  return (
    <SkeletonLoading background={Colors.skeleton.bg} highlight={Colors.skeleton.hl}>
      <View
        style={{
          marginHorizontal: 32,
          marginBottom: 44,
        }}
      >
        <View
          style={{
            height: 192,
            borderRadius: 8,
            backgroundColor: Colors.skeleton.bg,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 36,
              marginTop: 16,
              width: 200,
              backgroundColor: Colors.skeleton.bg,
              borderRadius: 8,
            }}
          />
          <View>
            <AntDesign name="heart" size={24} color="red" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
          }}
        >
          <AntDesign name="star" size={24} style={{ color: '#FFC529' }} />
          <Text className="font-bold ml-1">4.5</Text>
          <View
            style={{
              height: 14,
              width: 20,
              borderRadius: 10,
              backgroundColor: Colors.skeleton.bg,
            }}
          />
          <Button
            labelStyle={{
              color: Colors.btnText,
              textDecorationLine: 'underline',
            }}
            onPress={() => router.push('/review')}
          >
            Đánh giá
          </Button>
        </View>

        <View className="flex-row justify-between">
          <View
            style={{
              height: 28,
              width: 100,
              borderRadius: 10,
              backgroundColor: Colors.skeleton.bg,
            }}
          />
          <View className="flex-row items-center">
            <TouchableOpacity>
              <Feather name="minus-circle" size={30} color={colors.primaryBackgroundColor} />
            </TouchableOpacity>
            <View
              style={{
                height: 28,
                width: 40,
                borderRadius: 30,
                backgroundColor: Colors.skeleton.bg,
              }}
            />
            <TouchableOpacity>
              <Ionicons name="add-circle" size={32} color={colors.primaryBackgroundColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 14,
            flexGrow: 1,
            backgroundColor: Colors.skeleton.bg,
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: 14,
            flexGrow: 1,
            marginBottom: 10,
            backgroundColor: Colors.skeleton.bg,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            height: 14,
            flexGrow: 1,
            backgroundColor: Colors.skeleton.bg,
            borderRadius: 8,
            marginBottom: 10,
          }}
        />
      </View>
    </SkeletonLoading>
  );
};
