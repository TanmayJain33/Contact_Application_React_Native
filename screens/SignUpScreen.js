import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CommonContainer from '../source/components/CommonContainer';
import CommonTextInput from '../source/components/CommonTextInput';
import CommonButton from '../source/components/CommonButton';
import COLORS from '../source/assets/theme/colors';
import {
  AuthRegister,
  clearAuthState,
} from '../source/context/actions/AuthRegister';
import {GlobalContext} from '../source/context/Provider';
import {useFocusEffect} from '@react-navigation/native';
import CommonMessage from '../source/components/CommonMessage';

export default function SignUpScreen({navigation}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  function onChange({name, value}) {
    if (value != '') {
      if (name == 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {
              ...prev,
              [name]: 'Password must be more than 5 characters long.',
            };
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required.'};
      });
    }
    setForm({...form, [name]: value});
  }

  function onSubmit() {
    if (!form.userName) {
      setErrors(prev => {
        return {...prev, userName: 'Please enter a username.'};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please enter your first name.'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'Please enter your last name.'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please enter your email.'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please enter a passsword.'};
      });
    }
    if (
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item) &&
      Object.values(form).length == 5
    ) {
      AuthRegister(form)(authDispatch)(response => {
        navigation.navigate('Log In', {data: response});
      });
    }
  }

  return (
    <CommonContainer>
      <View>
        <Text style={styles.subTitle}>Create a free account</Text>
        {error?.error && <CommonMessage danger retry message={error?.error} />}
        <View style={styles.form}>
          <CommonTextInput
            label="Username"
            placeholder="Enter Username"
            onChangeText={value => {
              onChange({name: 'userName', value: value});
            }}
            error={errors.userName || error?.username?.[0]}
          />
          <CommonTextInput
            label="First Name"
            placeholder="Enter First Name"
            onChangeText={value => {
              onChange({name: 'firstName', value: value});
            }}
            error={errors.firstName || error?.first_name?.[0]}
          />
          <CommonTextInput
            label="Last Name"
            placeholder="Enter Last Name"
            onChangeText={value => {
              onChange({name: 'lastName', value: value});
            }}
            error={errors.lastName || error?.last_name?.[0]}
          />
          <CommonTextInput
            label="Email"
            placeholder="Enter Email"
            onChangeText={value => {
              onChange({name: 'email', value: value});
            }}
            error={errors.email || error?.email?.[0]}
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
            error={errors.password || error?.password?.[0]}
          />
          <CommonButton
            title="Submit"
            primary
            onPress={() => onSubmit()}
            loading={loading}
            disabled={loading}
          />
          <View style={styles.createSection}>
            <Text style={styles.infoText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Log In');
              }}>
              <Text style={styles.linkBtn}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CommonContainer>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  form: {paddingTop: 20},
  createSection: {flexDirection: 'row', justifyContent: 'space-between'},
  infoText: {fontSize: 16},
  linkBtn: {color: COLORS.primary, fontSize: 16},
});
