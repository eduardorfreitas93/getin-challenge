export enum RestaurantTypes {
  ADD_RESTAURANT_SUCCESS = 'restaurant/ADD_RESTAURANT_SUCCESS',
  ADD_RESTAURANT_SEARCH_SUCCESS = 'restaurant/ADD_RESTAURANT_SEARCH_SUCCESS',
  ADD_RESTAURANT_STARTED = 'restaurant/ADD_RESTAURANT_STARTED',
  ADD_RESTAURANT_END = 'restaurant/ADD_RESTAURANT_END',
  ADD_RESTAURANT_FAILURE = 'restaurant/ADD_RESTAURANT_FAILURE',
}

/* eslint-disable camelcase */
export interface IRestaurant {
  id: string;
  name: string;
  image: string;
  logo: string;
  description: string;
  telephone: string;
  price_range: string;
  payment_methods: string;
  website: string;
  opening_hours: string;
}

export interface RestaurantsState {
  readonly dataRestaurants: IRestaurant[];
  readonly dataRestaurantsSearch: IRestaurant[];
  loading: boolean;
  error: string | null;
}

export interface RestaurantsAction {
  type: string;
  payload: {
    data: IRestaurant[];
    page: number;
    error: string | null;
  };
}
