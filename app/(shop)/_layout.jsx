import { Stack } from 'expo-router';

const ReviewLayout = () => {
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
      </Stack>
    </>
  );
};

export default ReviewLayout;
