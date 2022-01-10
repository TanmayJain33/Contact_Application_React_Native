import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../source/assets/theme/colors';
import CommonContainer from '../source/components/CommonContainer';
import CommonTextInput from '../source/components/CommonTextInput';
import CommonButton from '../source/components/CommonButton';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_PLACEHOLDER_IMAGE_URI} from '../source/constants/PlaceholderImage';
import {GlobalContext} from '../source/context/Provider';
import CreateContacts from '../source/context/actions/CreateContacts';
import EditContacts from '../source/context/actions/EditContacts';
import {
  CONTACT_DETAILS_SCREEN,
  CONTACT_SCREEN,
} from '../source/constants/RouteNames';
import ImagePicker from '../source/components/ImagePicker';
import UploadImage from '../source/helpers/UploadImage';
import {useNavigation} from '@react-navigation/native';
import CountryCodes from '../source/utils/CountryCodes';

export default function CreateContactScreen({navigation, route}) {
  const [form, setForm] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [localFile, setLocalFile] = useState(null);
  const {setOptions} = useNavigation();

  const {
    contactDispatch,
    contactState: {
      createContacts: {loading, error},
    },
  } = useContext(GlobalContext);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  const sheetRef = useRef(null);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
  };

  useEffect(() => {
    if (route.params) {
      setOptions({title: 'Update contact'});
      const firstName = route.params.params.firstName;
      const lastName = route.params.params.lastName;
      const phoneNumber = route.params.params.phoneNumber;
      const isFavorite = route.params.params.isFavorite;
      const countryCode = route.params.params.countryCode;
      setForm(prev => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          countryCode,
        };
      });

      if (route.params?.params.contactPicture) {
        setLocalFile(route.params.params.contactPicture);
      }

      const country = CountryCodes.find(item => {
        return item.value.replace('+', '') == countryCode;
      });

      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }
    }
  }, []);

  const onSubmit = () => {
    if (route.params?.params) {
      if (localFile?.size) {
        setIsUploading(true);
        UploadImage(localFile)(url => {
          setIsUploading(false);
          EditContacts(
            {...form, contactPicture: url},
            route.params?.params.id,
          )(contactDispatch)(item => {
            navigation.navigate(CONTACT_DETAILS_SCREEN, {item});
          });
        })(error => {
          setIsUploading(false);
        });
      } else {
        EditContacts(form, route.params?.params.id)(contactDispatch)(item => {
          navigation.navigate(CONTACT_DETAILS_SCREEN, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsUploading(true);
        UploadImage(localFile)(url => {
          setIsUploading(false);
          CreateContacts({...form, contactPicture: url})(contactDispatch)(
            () => {
              navigation.navigate(CONTACT_DETAILS_SCREEN);
            },
          );
        })(error => {
          setIsUploading(false);
        });
      } else {
        CreateContacts(form)(contactDispatch)(() => {
          navigation.navigate(CONTACT_DETAILS_SCREEN);
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <CommonContainer>
        <Image
          source={{
            uri: localFile?.path || localFile || DEFAULT_PLACEHOLDER_IMAGE_URI,
          }}
          style={styles.imageView}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.imageText}>Choose Image</Text>
        </TouchableOpacity>
        <CommonTextInput
          label="First Name"
          placeholder="Enter First Name"
          value={form.firstName || ''}
          onChangeText={value => {
            onChangeText({name: 'firstName', value: value});
          }}
          error={error?.first_name?.[0]}
        />
        <CommonTextInput
          label="Last Name"
          placeholder="Enter Last Name"
          value={form.lastName || ''}
          onChangeText={value => {
            onChangeText({name: 'lastName', value: value});
          }}
          error={error?.last_name?.[0]}
        />
        <CommonTextInput
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={form.phoneNumber || ''}
          icon={
            <CountryPicker
              withFilter
              withFlag
              countryCode={form.countryCode || undefined}
              withCallingCode
              withCountryNameButton={false}
              withEmoji
              withCallingCodeButton
              onSelect={v => {
                const phoneCode = v.callingCode[0];
                const countryCode = v.cca2;
                setForm({...form, phoneCode, countryCode});
              }}
            />
          }
          iconPosition="left"
          style={{paddingLeft: 10}}
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value: value});
          }}
          error={error?.phone_number?.[0]}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 18}}>Add to Favorites</Text>
          <View
            style={{
              backgroundColor: form.isFavorite ? COLORS.primary : COLORS.grey,
              borderRadius: 100,
            }}>
            <Switch
              trackColor={{false: COLORS.grey, true: COLORS.primary}}
              thumbColor={COLORS.white}
              onValueChange={toggleValueChange}
              value={form.isFavorite}
            />
          </View>
        </View>
        <CommonButton
          primary
          title="Submit"
          onPress={onSubmit}
          loading={loading || isUploading}
          disabled={loading}
        />
      </CommonContainer>
      <ImagePicker ref={sheetRef} onFileSelected={onFileSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  imageText: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 10,
  },
});
