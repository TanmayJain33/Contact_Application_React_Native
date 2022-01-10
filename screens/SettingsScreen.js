import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import COLORS from '../source/assets/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppModal from '../source/components/AppModal';
import Check from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const saveSetting = (key, value) => {
    AsyncStorage.setItem(key, value);
  };

  const settingsOptions = [
    {title: 'My Info', subTitle: 'Setup your profile', onPress: () => {}},
    {title: 'Accounts', subTitle: null, onPress: () => {}},
    {
      title: 'Default account for new contacts',
      subTitle: email,
      onPress: () => {},
    },
    {title: 'Contacts to display', subTitle: 'All Contacts', onPress: () => {}},
    {
      title: 'Sort By',
      subTitle: sortBy,
      onPress: () => {
        setModalVisible(true);
      },
    },
    {title: 'Name format', subTitle: 'First name first', onPress: () => {}},
    {title: 'Import', subTitle: null, onPress: () => {}},
    {title: 'Export', subTitle: null, onPress: () => {}},
    {title: 'Blocked numbers', subTitle: null, onPress: () => {}},
    {title: 'About Contaxts', subTitle: null, onPress: () => {}},
  ];

  const prefArr = [
    {
      name: 'First Name',
      selected: sortBy == 'First Name',
      onPress: () => {
        saveSetting('sortBy', 'First Name');
        setSortBy('First Name');
        setModalVisible(false);
      },
    },
    {
      name: 'Last Name',
      selected: sortBy == 'Last Name',
      onPress: () => {
        saveSetting('sortBy', 'Last Name');
        setSortBy('Last Name');
        setModalVisible(false);
      },
    },
  ];

  const getSettings = async () => {
    const user = await AsyncStorage.getItem('user');
    setEmail(JSON.parse(user).email);
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        modalBody={
          <View>
            {prefArr.map(({name, selected, onPress}) => (
              <TouchableOpacity
                key={name}
                onPress={onPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                {selected && <Check name="check" size={20} />}
                <Text style={{fontSize: 20, paddingLeft: selected ? 10 : 30}}>
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        title="Sort Contacts By"
        setModalVisible={setModalVisible}
      />
      <ScrollView style={{backgroundColor: COLORS.white}}>
        {settingsOptions.map(({title, subTitle, onPress}) => (
          <TouchableOpacity key={title} onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}>
              <Text style={{fontSize: 18, color: COLORS.black}}>{title}</Text>
              {subTitle && (
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 14,
                    opacity: 0.6,
                    paddingTop: 5,
                  }}>
                  {subTitle}
                </Text>
              )}
            </View>
            <View style={{height: 0.5, backgroundColor: COLORS.grey}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
