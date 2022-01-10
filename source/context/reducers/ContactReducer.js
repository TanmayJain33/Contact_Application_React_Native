import {
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAIL,
  CREATE_CONTACTS_LOADING,
  CREATE_CONTACTS_SUCCESS,
  DELETE_CONTACTS_FAIL,
  DELETE_CONTACTS_LOADING,
  DELETE_CONTACTS_SUCCESS,
} from '../../constants/ActionTypes';

export default function ContactReducer(state, {type, payload}) {
  switch (type) {
    case DELETE_CONTACTS_LOADING: {
      return {
        ...state,
        deleteContacts: {
          ...state.deleteContacts,
          loading: true,
          error: null,
        },
      };
    }

    case DELETE_CONTACTS_SUCCESS: {
      return {
        ...state,
        deleteContacts: {
          ...state.deleteContacts,
          loading: false,
          error: null,
        },
        getContacts: {
          ...state.getContacts,
          loading: false,
          data: state.getContacts.data.filter(item => item.id !== payload),
          error: null,
        },
      };
    }

    case DELETE_CONTACTS_FAIL: {
      return {
        ...state,
        deleteContacts: {
          ...state.deleteContacts,
          loading: false,
          error: payload,
        },
      };
    }

    case CREATE_CONTACTS_LOADING:
      return {
        ...state,
        createContacts: {
          ...state.createContacts,
          loading: true,
          error: null,
        },
      };
    case CREATE_CONTACTS_SUCCESS:
      return {
        ...state,
        createContacts: {
          ...state.createContacts,
          loading: false,
          data: payload,
          error: null,
        },
        getContacts: {
          ...state.getContacts,
          loading: false,
          data: [payload, ...state.getContacts.data],
          error: null,
        },
      };
    case CREATE_CONTACTS_FAIL:
      return {
        ...state,
        createContacts: {
          ...state.createContacts,
          loading: false,
          error: payload,
        },
      };
    case GET_CONTACTS_LOADING:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: true,
          error: null,
        },
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
