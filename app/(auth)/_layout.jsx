import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        {
          // <Stack.Screen
          //         name="sign-in/sign-up"
          //         options={{
          //           headerShown: false,
          //         }}
          //       />
        }
      </Stack>
      <StatusBar />
    </>
  );
};

export default AuthLayout;
