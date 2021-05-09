/* eslint-disable import/extensions */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import { render, waitFor, fireEvent } from '../../../testUtils';
import Search from '../../../src/pages/Search';
import api from '../../../src/config/api';

const mock = new MockAdapter(api);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
  };
});

describe('Search.spec.tsx', () => {
  const restaurantsMockData = [
    {
      id: '1',
      name: 'Restaurant 1',
      image: 'https://loremflickr.com/640/480/cuisine',
      logo: 'https://loremflickr.com/500/500/logo',
      description:
        'Restaurant 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue orci erat, vitae bibendum arcu tempor ac. Suspendisse eget dignissim mi. Ut semper eros nulla, non sagittis mi imperdiet quis. Sed eget libero velit. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      telephone: '551143829385',
      price_range: 'De R$ 40,00 a R$ 70,00 por pessoa.',
      payment_methods: 'Dinheiro, cartão de crédito e débito.',
      website: 'http://www.restaurant1.com.br',
      opening_hours: 'De terça à domingo, das 17:00 ãs 23:00.',
    },
    {
      id: '2',
      name: 'Restaurant 2',
      image: 'https://loremflickr.com/640/480/cuisine',
      logo: 'https://loremflickr.com/500/500/logo',
      description:
        'Restaurant 2 lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue orci erat, vitae bibendum arcu tempor ac. Suspendisse eget dignissim mi. Ut semper eros nulla, non sagittis mi imperdiet quis. Sed eget libero velit. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
      telephone: '551143829385',
      price_range: 'De R$ 40,00 a R$ 70,00 por pessoa.',
      payment_methods: 'Dinheiro, cartão de crédito e débito.',
      website: 'http://www.restaurant2.com.br',
      opening_hours: 'De terça à domingo, das 17:00 ãs 23:00.',
    },
  ];

  const mockStateRestaurants = {
    restaurants: {
      dataRestaurantsSearch: [],
      loading: false,
    },
  };

  test('should check if that the list appears empty on the first upload', async () => {
    const { getByTestId } = render(<Search />, {
      initialState: mockStateRestaurants,
    });
    const list = getByTestId('list');

    expect(list.props.data.length).toBe(0);
  });

  test('should check if the input field appears with focus and empty', async () => {
    const { getByTestId } = render(<Search />, {
      initialState: mockStateRestaurants,
    });
    const inputSearch = getByTestId('inputSearch');

    expect(inputSearch.props.autoFocus).toBeTruthy();
    expect(inputSearch.props.children).toBeUndefined();
  });

  test('should check if that when you enter a value in the text field, data appears', async () => {
    const textSearch = 'restaurant 1';
    mock
      .onGet(`/v1/restaurants?page=1&limit=10&search=${textSearch}`)
      .reply(200, { data: [restaurantsMockData[0]] });

    const { getByTestId } = render(<Search />, {
      initialState: mockStateRestaurants,
    });
    const inputSearch = getByTestId('inputSearch');
    const list = getByTestId('list');

    fireEvent.changeText(inputSearch, textSearch);

    await waitFor(() => {
      expect(list.props.data.length).toBe(1);
    });
  });

  test('should check if more data appears when the scroll event until the end of the list happens', async () => {
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 391,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };

    const textSearch = 'restaurant';
    mock
      .onGet(`/v1/restaurants?page=1&limit=10&search=${textSearch}`)
      .reply(200, { data: [restaurantsMockData[0]] })
      .onGet(`/v1/restaurants?page=2&limit=10&search=${textSearch}`)
      .reply(200, { data: [restaurantsMockData[1]] });

    const { getByTestId } = render(<Search />, {
      initialState: {
        ...mockStateRestaurants,
        restaurants: {
          ...mockStateRestaurants.restaurants,
          dataRestaurantsSearch: [restaurantsMockData[0]],
        },
      },
    });

    const inputSearch = getByTestId('inputSearch');
    const list = getByTestId('list');

    await waitFor(() => {
      fireEvent.changeText(inputSearch, textSearch);
      fireEvent.scroll(list, eventData);
      expect(list.props.data.length).toBe(2);
    });
  });

  test('should check if there is no more data when the list scroll event happens', async () => {
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 400,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };

    const textSearch = 'restaurant';
    mock
      .onGet(`/v1/restaurants?page=1&limit=10&search=${textSearch}`)
      .reply(200, { data: [restaurantsMockData[0]] });

    const { getByTestId } = render(<Search />, {
      initialState: mockStateRestaurants,
    });

    const inputSearch = getByTestId('inputSearch');
    const list = getByTestId('list');

    await waitFor(() => {
      fireEvent.changeText(inputSearch, textSearch);
      fireEvent.scroll(list, eventData);
      expect(list.props.data.length).toBe(1);
    });
  });

  test('should check if that when you click the back button it calls goBack', async () => {
    const { getByTestId } = render(<Search />, {
      initialState: mockStateRestaurants,
    });

    const buttonBack = await waitFor(() => getByTestId('buttonBack'));

    fireEvent.press(buttonBack);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
