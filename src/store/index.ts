import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reactotron } from '../config/ReactotronConfig';

import rootReducer from './ducks/rootReducer';

// export interface ApplicationState {}

const middlewares = [applyMiddleware(thunk)];

if (__DEV__) {
  const reactotronMiddleware = reactotron.createEnhancer();

  middlewares.push(reactotronMiddleware);
}

const store: Store = createStore(rootReducer, compose(...middlewares));

export default store;
