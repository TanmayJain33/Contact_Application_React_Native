import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../constants/ActionTypes';
import axiosInstance from '../../helpers/AxiosInterceptor';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export const AuthRegister =
  ({
    email,
    password,
    firstName: first_name,
    lastName: last_name,
    userName: username,
  }) =>
  dispatch =>
  onSuccess => {
    dispatch({type: REGISTER_LOADING});
    axiosInstance
      .post('auth/register', {
        email,
        password,
        first_name,
        last_name,
        username,
      })
      .then(res => {
        dispatch({type: REGISTER_SUCCESS, payload: res.data});
        onSuccess(res.data);
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response
            ? error.response.data
            : {error: 'Something went wrong, please try again.'},
        });
      });
  };
