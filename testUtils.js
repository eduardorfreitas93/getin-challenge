import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import RootReducer from './src/store/ducks/rootReducer';
import { lightTheme } from './src/style/theme';

const config = initialState => {
  const middlewares = [applyMiddleware(thunk)];
  return createStore(RootReducer, initialState, compose(...middlewares));
};

const reduxRender = (
  ui,
  { initialState = {}, store = config(initialState) } = {},
  options,
) => ({
  ...render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </Provider>
    ),
    ...options,
  }),
  store,
});

export * from '@testing-library/react-native';

export { reduxRender as render };
