import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { lightTheme } from './style/theme';

import store from './store';
import Routes from './routes';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}
