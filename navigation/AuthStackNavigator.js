import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LOG_IN_SCREEN, SIGN_UP_SCREEN} from '../source/constants/RouteNames';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LogInScreen">
      <AuthStack.Screen name={LOG_IN_SCREEN} component={LogInScreen} />
      <AuthStack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}
