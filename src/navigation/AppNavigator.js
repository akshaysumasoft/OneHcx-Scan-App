import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import { AuthContext } from '../contexts/AuthContext';
import OtpScreen from '../screens/OtpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userToken } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {!userToken ? (
    //       <>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="OTP" component={OtpScreen} />
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //         <Stack.Screen name="Scanner" component={ScannerScreen} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
