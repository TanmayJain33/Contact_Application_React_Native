import React, {createContext, useReducer} from 'react';
import AuthReducer from './reducers/AuthReducer';
import AuthInitialState from './initialStates/AuthInitialState';
import ContactReducer from './reducers/ContactReducer';
import ContactInitialState from './initialStates/ContactInitialState';

export const GlobalContext = createContext({});

export default function GlobalProvider({children}) {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);
  const [contactState, contactDispatch] = useReducer(
    ContactReducer,
    ContactInitialState,
  );
  return (
    <GlobalContext.Provider
      value={{authState, contactState, authDispatch, contactDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
}
