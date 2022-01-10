import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  CLEAR_AUTH_STATE,
} from '../../constants/ActionTypes';

export default function AuthReducer(state, {type, payload}) {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_START:
      return {...state, loading: true};
    case REGISTER_SUCCESS:
      return {...state, loading: false, data: payload};
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {...state, loading: false, error: payload};
    case LOGIN_SUCCESS:
      return {...state, loading: false, data: payload, isLoggedIn: true};
    case LOGOUT_USER:
      return {...state, loading: false, data: null, isLoggedIn: false};
    case CLEAR_AUTH_STATE:
      return {...state, loading: false, data: null, error: null};
    default:
      return state;
  }
}
