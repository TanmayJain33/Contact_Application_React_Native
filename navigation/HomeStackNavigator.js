import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CONTACT_DETAILS_SCREEN,
  CONTACT_SCREEN,
  SETTINGS_SCREEN,
  CREATE_CONTACT_SCREEN,
  LOG_OUT_SCREEN,
} from '../source/constants/RouteNames';
import ContactScreen from '../screens/ContactScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import CreateContactScreen from '../screens/CreateContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogOutScreen from '../screens/LogOutScreen';

const HomeStack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName={CONTACT_SCREEN}>
      <HomeStack.Screen name={CONTACT_SCREEN} component={ContactScreen} />
      <HomeStack.Screen
        name={CONTACT_DETAILS_SCREEN}
        component={ContactDetailsScreen}
      />
      <HomeStack.Screen
        name={CREATE_CONTACT_SCREEN}
        component={CreateContactScreen}
      />
      <HomeStack.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />
      <HomeStack.Screen name={LOG_OUT_SCREEN} component={LogOutScreen} />
    </HomeStack.Navigator>
  );
}
