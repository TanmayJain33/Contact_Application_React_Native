import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import {TouchableOpacity} from 'react-native';
import Menu from 'react-native-vector-icons/MaterialIcons';
import ModalComponent from '../source/components/ModalComponent';
import {GlobalContext} from '../source/context/Provider';
import GetContacts from '../source/context/actions/GetContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACT_DETAILS_SCREEN} from '../source/constants/RouteNames';

export default function ContactScreen({navigation}) {
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const contactsRef = useRef([]);

  const {
    contactDispatch,
    contactState: {
      getContacts: {data, loading},
    },
  } = useContext(GlobalContext);

  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );

  useEffect(() => {
    GetContacts()(contactDispatch);
  }, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <Menu name="menu" size={25} style={{padding: 10}} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    const prevList = contactsRef.current;
    contactsRef.current = data;
    const newList = contactsRef.current;
    if (newList.length - prevList.length == 1) {
      const newContact = newList.find(
        item => !prevList.map(i => i.id).includes(item.id),
      );
      navigation.navigate(CONTACT_DETAILS_SCREEN, {
        firstName: newContact.first_name,
        lastName: newContact.last_name,
        phoneNumber: newContact.phone_number,
        contactPicture: newContact.contact_picture,
        countryCode: newContact.country_code,
        isFavorite: newContact.is_favorite,
        id: newContact.id,
      });
    }
  }, [data.length]);

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data}
      loading={loading}
      navigation={navigation}
      sortBy={sortBy}
    />
  );
}
