/* eslint-disable import/extensions */
import React from 'react';
import { render, fireEvent } from '../../../testUtils';

import RestaurantList from '../../../src/components/RestaurantList';

const handelFetchMoreMock = jest.fn();

jest.mock('../../../src/components/RestaurantCard', () => () => <></>);

describe('RestaurantList.spec.tsx', () => {
  const restaurants = [
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
  const titleMock = 'Restaurant';
  const colorActivityIndicatorMock = '#ED1C24';

  test('should check if the title is restaurant', () => {
    const { getByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore={false}
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const title = getByTestId('title');

    expect(title.props.children).toBe(titleMock);
  });

  test('should check the quantity of rendered items', () => {
    const { getByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore={false}
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const list = getByTestId('list');

    expect(list.props.data.length).toBe(restaurants.length);
  });

  test('should check if the loading appears', () => {
    const { getByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const activityIndicator = getByTestId('activityIndicator');

    expect(activityIndicator).toBeTruthy();
  });

  test('should check if the loading not appears', () => {
    const { queryByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore={false}
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const activityIndicator = queryByTestId('activityIndicator');

    expect(activityIndicator).not.toBeTruthy();
  });

  test('should check if the loading not appears', () => {
    const { queryByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const activityIndicator = queryByTestId('activityIndicator');

    expect(activityIndicator.props.color).toBe(colorActivityIndicatorMock);
  });

  test('should check if that when the listing reaches the end it calls the handelFetchMore one time', () => {
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

    const { getByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore={false}
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const list = getByTestId('list');

    fireEvent.scroll(list, eventData);

    expect(handelFetchMoreMock).toHaveBeenCalledTimes(1);
  });

  test('should check if that when the listing reaches the end it calls the handelFetchMore one time', () => {
    const { getByTestId } = render(
      <RestaurantList
        title={titleMock}
        restaurants={restaurants}
        colorActivityIndicator={colorActivityIndicatorMock}
        loadingMore={false}
        handelFetchMore={handelFetchMoreMock}
      />,
    );
    const list = getByTestId('list');

    expect(list.props.getItemLayout().length).toBe(177);
  });
});
