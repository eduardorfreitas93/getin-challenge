import { Reducer } from 'redux';

import {
  RestaurantsState,
  RestaurantTypes,
  RestaurantsAction,
  IRestaurant,
} from './types';

export const INITIAL_STATE: RestaurantsState = {
  loading: false,
  dataRestaurants: [],
  dataRestaurantsSearch: [],
  error: null,
};

const reducer: Reducer<RestaurantsState, RestaurantsAction> = (
  state = INITIAL_STATE,
  action,
) => {
  let data: IRestaurant[] = [];
  switch (action.type) {
    case RestaurantTypes.ADD_RESTAURANT_SUCCESS:
      return {
        ...state,
        dataRestaurants: [...state.dataRestaurants, ...action.payload.data],
        loading: false,
        error: null,
      };
    case RestaurantTypes.ADD_RESTAURANT_SEARCH_SUCCESS:
      if (action.payload.page > 1) {
        data = [...state.dataRestaurantsSearch, ...action.payload.data];
      } else {
        data = action.payload.data;
      }

      return {
        ...state,
        dataRestaurantsSearch: data,
        loading: false,
        error: null,
      };
    case RestaurantTypes.ADD_RESTAURANT_STARTED:
      return {
        ...state,
        loading: true,
      };
    case RestaurantTypes.ADD_RESTAURANT_END:
      return {
        ...state,
        loading: false,
      };
    case RestaurantTypes.ADD_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
