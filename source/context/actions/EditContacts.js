import {
  EDIT_CONTACTS_FAIL,
  EDIT_CONTACTS_LOADING,
  EDIT_CONTACTS_SUCCESS,
} from '../../constants/ActionTypes';
import axiosInstance from '../../helpers/AxiosInterceptor';

export default (form, id) => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: EDIT_CONTACTS_LOADING,
  });

  axiosInstance
    .put(`/contacts/${id}`, requestPayload)
    .then(res => {
      dispatch({
        type: EDIT_CONTACTS_SUCCESS,
        payload: res.data,
      });
      onSuccess(res.data);
    })
    .catch(error => {
      dispatch({
        type: EDIT_CONTACTS_FAIL,
        payload: error.response
          ? error.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
