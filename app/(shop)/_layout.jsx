import { Stack } from 'expo-router';

const ShopLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          tabBarStyle: {
            height: '0',
          },
        }}
      >
        <Stack.Screen
          name="review"
          options={{
            title: 'review',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="product-detail"
          options={{
            title: 'product-detail',
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        />
      </Stack>
    </>
  );
};

export default ShopLayout;
