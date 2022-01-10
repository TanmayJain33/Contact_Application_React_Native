import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import COLORS from '../source/assets/theme/colors';
import Call from 'react-native-vector-icons/Ionicons';
import Message from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonButton from '../source/components/CommonButton';
import {useNavigation} from '@react-navigation/native';
import Star from 'react-native-vector-icons/MaterialIcons';
import StarBorder from 'react-native-vector-icons/MaterialIcons';
import Delete from 'react-native-vector-icons/MaterialIcons';
import {GlobalContext} from '../source/context/Provider';
import DeleteContacts from '../source/context/actions/DeleteContacts';
import {
  CONTACT_SCREEN,
  CREATE_CONTACT_SCREEN,
} from '../source/constants/RouteNames';

export default function ContactDetailsScreen({navigation, route}) {
  const {firstName} = route.params;
  const {lastName} = route.params;
  const {phoneNumber} = route.params;
  const {countryCode} = route.params;
  const {contactPicture} = route.params;
  const {isFavorite} = route.params;
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {setOptions} = useNavigation();

  const {
    contactDispatch,
    contactState: {
      deleteContacts: {loading},
    },
  } = useContext(GlobalContext);

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    if (route) {
      setOptions({
        title: firstName + ' ' + lastName,
        headerRight: () => {
          return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity>
                {isFavorite ? (
                  <Star name="star" size={21} color={COLORS.grey} />
                ) : (
                  <StarBorder
                    name="star-border"
                    size={21}
                    color={COLORS.grey}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingLeft: 10}}
                onPress={() => {
                  Alert.alert(
                    'Delete!',
                    'Are you sure you want to delete ' + firstName,
                    [
                      {text: 'Cancel', onPress: () => {}},
                      {
                        text: 'Ok,',
                        onPress: () => {
                          DeleteContacts(id)(contactDispatch)(() => {
                            navigation.navigate(CONTACT_SCREEN);
                          });
                        },
                      },
                    ],
                  );
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <Delete name="delete" size={21} color={COLORS.grey} />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [route, loading]);

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        {contactPicture && (
          <View style={styles.imageContainer}>
            {isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator color={COLORS.primary} />
              </View>
            )}
            <View>
              <Image
                source={{uri: contactPicture}}
                style={styles.detailPhoto}
                onLoadStart={onLoadStart}
                onLoadEnd={onLoadEnd}
                onError={onError}
              />
            </View>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
        </View>
        <View style={styles.hrLine} />
        <View style={styles.topCallOptions}>
          <TouchableOpacity style={styles.topCallOption}>
            <Call name="call-outline" size={27} color={COLORS.primary} />
            <Text style={styles.middleText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Message name="message-text" size={27} color={COLORS.primary} />
            <Text style={styles.middleText}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCallOption}>
            <Video name="video" size={27} color={COLORS.primary} />
            <Text style={styles.middleText}>Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middleCallOptions}>
          <Call name="call-outline" size={27} color={COLORS.grey} />
          <View style={styles.phoneMobile}>
            <Text>{'+' + countryCode + ' ' + phoneNumber}</Text>
            <Text>Mobile</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Video name="video" size={27} color={COLORS.primary} />
            <Message
              name="message-text"
              style={styles.msgIcon}
              size={27}
              color={COLORS.primary}
            />
          </View>
        </View>
        <CommonButton
          primary
          title="Edit Contact"
          style={{alignSelf: 'flex-end', marginRight: 20, width: 200}}
          onPress={() => {
            navigation.navigate(CREATE_CONTACT_SCREEN, route);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  detailPhoto: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  imageContainer: {
    height: 300,
    width: '100%',
  },
  loading: {
    paddingLeft: '40%',
    paddingTop: 140,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 23,
  },
  hrLine: {
    height: 10,
    borderColor: COLORS.grey,
    borderBottomWidth: 0.4,
  },
  topCallOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topCallOption: {
    alignItems: 'center',
  },
  middleText: {
    fontSize: 14,
    paddingVertical: 5,
    color: COLORS.primary,
  },
  middleCallOptions: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  phoneMobile: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  msgIcon: {
    paddingLeft: 20,
  },
});
