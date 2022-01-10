import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackNavigator from './HomeStackNavigator';
import {HOME_NAVIGATOR, SETTINGS_SCREEN} from '../source/constants/RouteNames';
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommonContainer from '../source/components/CommonContainer';
import {GlobalContext} from '../source/context/Provider';
import logoutUser from '../source/context/actions/LogoutUser';
import Settings from 'react-native-vector-icons/MaterialIcons';
import Logout from 'react-native-vector-icons/MaterialIcons';

export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const {authDispatch} = useContext(GlobalContext);

  function NavItems({navigation, authDispatch}) {
    function handleLogout() {
      navigation.toggleDrawer();
      Alert.alert('Logout!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {
            logoutUser()(authDispatch);
          },
        },
      ]);
    }

    const Items = [
      {
        icon: <Settings name="settings" size={20} />,
        name: 'Settings',
        onPress: () => {
          navigation.navigate(SETTINGS_SCREEN);
        },
      },
      {
        icon: <Logout name="logout" size={20} />,
        name: 'Log Out',
        onPress: handleLogout,
      },
    ];

    return (
      <View>
        <CommonContainer>
          <Image
            source={require('../source/assets/images/logo.png')}
            style={styles.logoImage}
          />
          <View>
            {Items.map(({name, icon, onPress}) => (
              <TouchableOpacity
                onPress={onPress}
                key={name}
                style={styles.item}>
                {icon}
                <Text style={styles.itemText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </CommonContainer>
      </View>
    );
  }

  function getDrawerContent(navigation, authDispatch) {
    return <NavItems navigation={navigation} authDispatch={authDispatch} />;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}
      drawerContent={({navigation}) =>
        getDrawerContent(navigation, authDispatch)
      }>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeStackNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
    paddingVertical: 7,
    paddingLeft: 20,
  },
});
