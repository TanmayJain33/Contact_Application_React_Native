import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
} from '../../constants/ActionTypes';
import axiosInstance from '../../helpers/AxiosInterceptor';

export const LoginUser =
  ({password, userName: username}) =>
  dispatch => {
    dispatch({type: LOGIN_START});
    axiosInstance
      .post('auth/login', {
        password,
        username,
      })
      .then(res => {
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response
            ? error.response.data
            : {error: 'Something went wrong, please try again.'},
        });
      });
  };
