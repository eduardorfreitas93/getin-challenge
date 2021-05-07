import { Dispatch } from 'redux';

import { RestaurantTypes, IRestaurant } from './types';

import api from '../../../config/api';

const addRestaurantSuccess = (data: IRestaurant[]) => ({
  type: RestaurantTypes.ADD_RESTAURANT_SUCCESS,
  payload: { data },
});

const addRestaurantSearchSuccess = (data: IRestaurant[], page: number) => ({
  type: RestaurantTypes.ADD_RESTAURANT_SEARCH_SUCCESS,
  payload: { data, page },
});

const addRestaurantStarted = () => ({
  type: RestaurantTypes.ADD_RESTAURANT_STARTED,
});

const addRestaurantEnd = () => ({
  type: RestaurantTypes.ADD_RESTAURANT_END,
});

const addRestaurantFailure = (error: string) => ({
  type: RestaurantTypes.ADD_RESTAURANT_FAILURE,
  payload: {
    error,
  },
});

export const addRestaurants = (page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(addRestaurantStarted());

    try {
      const { data } = await api.get(`/v1/restaurants?page=${page}&limit=10`);

      if (!data.data.length) {
        dispatch(addRestaurantEnd());
        return;
      }

      dispatch(addRestaurantSuccess(data.data));
    } catch (e) {
      dispatch(addRestaurantFailure(e.message));
    }
  };
};

export const addRestaurantsSearch = (page: number, textSeacrch = '') => {
  return async (dispatch: Dispatch) => {
    if (!textSeacrch) {
      dispatch(addRestaurantSearchSuccess([], 1));
      return;
    }
    dispatch(addRestaurantStarted());

    try {
      const { data } = await api.get(
        `/v1/restaurants?page=${page}&limit=10&search=${textSeacrch}`,
      );

      if (!data.data.length) {
        dispatch(addRestaurantEnd());
        return;
      }

      dispatch(addRestaurantSearchSuccess(data.data, page));
    } catch (e) {
      dispatch(addRestaurantFailure(e.message));
    }
  };
};
