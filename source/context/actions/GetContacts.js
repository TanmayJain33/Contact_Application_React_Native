import {
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from '../../constants/ActionTypes';
import axiosInstance from '../../helpers/AxiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_CONTACTS_LOADING,
  });

  axiosInstance
    .get('/contacts/')
    .then(res => {
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_CONTACTS_FAIL,
        payload: error.response
          ? error.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
