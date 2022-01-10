import React from 'react';
import AppNavigationContainer from './navigation/AppNavigationContainer';
import GlobalProvider from './source/context/Provider';

export default function App() {
  return (
    <GlobalProvider>
      <AppNavigationContainer />
    </GlobalProvider>
  );
}
