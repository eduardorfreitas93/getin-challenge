import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reactotron } from '../config/ReactotronConfig';

import rootReducer from './ducks/rootReducer';

import { RestaurantsState } from './ducks/restaurant/types';

export interface ApplicationState {
  restaurants: RestaurantsState;
}

const middlewares = [applyMiddleware(thunk)];

if (__DEV__) {
  const reactotronMiddleware = reactotron.createEnhancer();

  middlewares.push(reactotronMiddleware);
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  compose(...middlewares),
);

export default store;
