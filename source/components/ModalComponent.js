import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import CommonMessage from './CommonMessage';
import COLORS from '../assets/theme/colors';
import Right from 'react-native-vector-icons/AntDesign';
import Plus from 'react-native-vector-icons/FontAwesome5';
import {CREATE_CONTACT_SCREEN} from '../constants/RouteNames';
import {CONTACT_DETAILS_SCREEN} from '../constants/RouteNames';

export default function ModalComponent({data, loading, navigation, sortBy}) {
  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 200, paddingHorizontal: 125}}>
        <CommonMessage secondary message="No contacts to show" />
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {
      contact_picture,
      first_name,
      last_name,
      phone_number,
      country_code,
      is_favorite,
    } = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(CONTACT_DETAILS_SCREEN, {
            firstName: item.first_name,
            lastName: item.last_name,
            phoneNumber: item.phone_number,
            countryCode: item.country_code,
            contactPicture: item.contact_picture,
            isFavorite: item.is_favorite,
            id: item.id,
          });
        }}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              source={{uri: contact_picture}}
              style={{width: 45, height: 45, borderRadius: 100}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
                backgroundColor: COLORS.grey,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, color: COLORS.white}}>
                {first_name[0]}
                {last_name[0]}
              </Text>
            </View>
          )}
          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17}}>{first_name}</Text>
              <Text style={{fontSize: 17}}> {last_name}</Text>
            </View>
            <Text style={{opacity: 0.6, fontSize: 14, paddingVertical: 5}}>
              {`${country_code} ${phone_number}`}
            </Text>
          </View>
        </View>
        <Right name="right" size={18} color={COLORS.grey} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{backgroundColor: COLORS.white, flex: 1}}>
        {loading && (
          <View style={{paddingVertical: 200}}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        {!loading && (
          <View style={{paddingVertical: 20}}>
            <FlatList
              renderItem={renderItem}
              data={
                sortBy
                  ? data.sort((a, b) => {
                      if (sortBy == 'First Name') {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy == 'Last Name') {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                    })
                  : data
              }
              ItemSeparatorComponent={() => (
                <View
                  style={{height: 0.5, backgroundColor: COLORS.grey}}></View>
              )}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={<View style={{height: 150}} />}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigation.navigate(CREATE_CONTACT_SCREEN);
        }}>
        <Plus name="plus" color={COLORS.white} size={25} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  floatingActionButton: {
    backgroundColor: COLORS.primary,
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
