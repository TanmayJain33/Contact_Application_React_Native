import {
  DELETE_CONTACTS_FAIL,
  DELETE_CONTACTS_LOADING,
  DELETE_CONTACTS_SUCCESS,
} from '../../constants/ActionTypes';
import axiosInstance from '../../helpers/AxiosInterceptor';

export default id => dispatch => onSuccess => {
  dispatch({
    type: DELETE_CONTACTS_LOADING,
  });

  axiosInstance
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_CONTACTS_SUCCESS,
        payload: id,
      });
      onSuccess();
    })
    .catch(error => {
      dispatch({
        type: DELETE_CONTACTS_FAIL,
        payload: error.response
          ? error.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
