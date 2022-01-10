import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CommonContainer from '../source/components/CommonContainer';
import CommonTextInput from '../source/components/CommonTextInput';
import CommonButton from '../source/components/CommonButton';
import CommonMessage from '../source/components/CommonMessage';
import COLORS from '../source/assets/theme/colors';
import {GlobalContext} from '../source/context/Provider';
import {LoginUser} from '../source/context/actions/LoginUser';
import {useRoute} from '@react-navigation/native';

export default function LogInScreen({navigation}) {
  const [form, setForm] = useState({});
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const {params} = useRoute();
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      setForm({...form, userName: params.data.username});
    }
  }, [params]);

  function onSubmit() {
    if (form.userName && form.password) {
      LoginUser(form)(authDispatch);
    }
  }

  function onChange({name, value}) {
    setJustSignedUp(false);
    setForm({...form, [name]: value});
  }

  return (
    <CommonContainer>
      <Image
        source={require('../source/assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to Contaxts</Text>
        <Text style={styles.subTitle}>Please login here</Text>
        <View style={styles.form}>
          {justSignedUp && (
            <CommonMessage
              success
              onDismiss={() => {}}
              message="Account created successfully"
            />
          )}
          {error && !error.error && (
            <CommonMessage
              danger
              onDismiss={() => {}}
              message="Invalid Credentials"
            />
          )}
          {error?.error && (
            <CommonMessage danger onDismiss={() => {}} message={error?.error} />
          )}
          <CommonTextInput
            label="Username"
            placeholder="Enter Username"
            value={form.userName || ''}
            onChangeText={value => {
              onChange({name: 'userName', value: value});
            }}
          />
          <CommonTextInput
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>{isSecureEntry ? 'SHOW' : 'HIDE'}</Text>
              </TouchableOpacity>
            }
            iconPosition="right"
            onChangeText={value => {
              onChange({name: 'password', value: value});
            }}
          />
          <CommonButton
            title="Submit"
            primary
            onPress={onSubmit}
            disabled={loading}
            loading={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Need a new Account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Sign Up');
              }}>
              <Text style={styles.linkBtn}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  form: {
    paddingTop: 20,
  },
  createSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {fontSize: 16},
  linkBtn: {
    color: COLORS.primary,
    fontSize: 16,
  },
});
