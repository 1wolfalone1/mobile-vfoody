import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import HeaderShopAnimated from '../../components/shop/HeaderShopAnimated';
import HeaderStickyShop from '../../components/shop/HeaderStickyShop';
import ListAllProductsInShop from '../../components/shop/ListAllProductsInShop';
import ListBestProductInShop from '../../components/shop/ListBestProductInShop';
import ListPromotionInShop from '../../components/shop/ListPromotionInShop';
import {
  getListAllProductsInShop,
  getListBestProduct,
  getListPromotionInShop,
  getShopInfo,
  listAllProductSelector,
  listBestProductSelector,
  listPromotionShopSelector,
  shopInfoSelector,
} from '../../redux/slice/shopDetailsSlice';

const ShopPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [isHeaderTop, setIsHeaderTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const heightHeaderSticky = 80;
  const shopInfo = useSelector(shopInfoSelector);
  const listPromotion = useSelector(listPromotionShopSelector);
  const listBestProduct = useSelector(listBestProductSelector);
  const listAllProduct = useSelector(listAllProductSelector);
  const dispatch = useDispatch();
  const product = {
    id: 'banhmi01',
    name: 'Bánh mì',
    description: 'Bánh mì với lớp vỏ ngoài giòn tan, ruột mềm, còn bên trong là phần nhân',
    price: '20000',
    image_url:
      'https://cdn.24h.com.vn/upload/1-2024/images/2024-03-16//1710602210-1710445729-picture-1-1710445636-793-width1200height900-width1200height900.jpg',
    total_order: 2,
    status: 'active',
    shop_id: 'shop01',
  };
  useEffect(() => {
    dispatch(getListPromotionInShop(1));
    dispatch(getShopInfo(1));
    dispatch(getListBestProduct(1));
    dispatch(getListAllProductsInShop(1));
    const listener = scrollOffsetY.addListener(({ value }) => {
      console.log(value, ' scroll value');
      if (value > 252) {
        setIsHeaderTop(true);
        setIsSearchOpen(true); //
      } else {
        setIsHeaderTop(false);
        setIsSearchOpen(false);
      }
    });
    console.log(' testtstest');
    return () => {
      scrollOffsetY.removeListener(listener);
    };
  }, []);
  return (
    <SafeAreaView className="flex-1" style={{ zIndex: -1, backgroundColor: '#ffffffff' }}>
      <HeaderStickyShop
        shopInfo={shopInfo}
        isHeaderTop={isHeaderTop}
        heightHeaderSticky={heightHeaderSticky}
        shopName={'Tiem Banh Mi Dem asdfkja asdfkljasf asasdfasfds sdafadf  fd'}
      />
      <HeaderShopAnimated
        shopInfo={shopInfo}
        heightHeaderSticky={heightHeaderSticky}
        shopName={'Tiem Banh Mi Dem asdfkja asdfkljasf asasdfasfds sdafadf  fd'}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        isHeaderTop={isHeaderTop}
        setIsHeaderTop={setIsHeaderTop}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        image_url={product.image_url}
        animHeaderValue={scrollOffsetY}
      />
      <ScrollView
        style={{ zIndex: -1 }}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}
      >
        <Text className="text-lg font-hnow65medium px-8 mt-4">Giảm giá cho bạn</Text>
        <ListPromotionInShop listPromotion={listPromotion} />
        <Text className="text-lg font-hnow65medium px-8 mt-1">Sản phẩm nổi bật</Text>
        <ListBestProductInShop data={listBestProduct} />
        <Text className="text-lg font-hnow65medium px-8 mt-1">Tất cả sản phẩm</Text>
        <ListAllProductsInShop data={listAllProduct} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopPage;
