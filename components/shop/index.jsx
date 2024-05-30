import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import HeaderShopAnimated from '../../components/shop/HeaderShopAnimated';
import HeaderStickyShop from '../../components/shop/HeaderStickyShop';
import ListPromotionInShop from '../../components/shop/ListPromotionInShop';
import { getListPromotionInShop, getShopInfo, listPromotionShopSelector, shopInfoSelector } from '../../redux/slice/shopDetailsSlice';

const ShopPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [isHeaderTop, setIsHeaderTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const heightHeaderSticky = 80;
  const shopInfo = useSelector(shopInfoSelector);
  const listPromotion = useSelector(listPromotionShopSelector);
  const dispatch = useDispatch();;
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
    dispatch(getListPromotionInShop())
    dispatch(getShopInfo());
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
    <SafeAreaView className="flex-1" style={{ zIndex: -1, backgroundColor: '#ffffffea' }}>
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
        shopName={'Tiem Banh Mi Dem'}
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
        <Text className="text-lg font-hnow65medium px-8 mt-4">Giam Gia Cho Ban</Text>
        <ListPromotionInShop listPromotion={listPromotion} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopPage;
