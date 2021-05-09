/* eslint-disable import/extensions */
import React from 'react';
import MockAdapter from 'axios-mock-adapter';

import { render, waitFor, fireEvent } from '../../../testUtils';
import Details from '../../../src/pages/Details';
import api from '../../../src/config/api';

const mock = new MockAdapter(api);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
    useRoute: () => ({
      params: { id: '1' },
    }),
  };
});

describe('Details.spec.tsx', () => {
  const dataRestaurantMock = {
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
  };

  test('should check if loading appears while loading the first time', async () => {
    const { getByTestId } = render(<Details />);

    await waitFor(() => {
      const viewLoading = getByTestId('viewLoading');
      expect(viewLoading).toBeTruthy();
    });
  });

  test('should check if that when you click the back button it calls goBack', async () => {
    mock.onGet('/v1/restaurants/1').reply(200, { data: dataRestaurantMock });

    const { getByTestId } = render(<Details />);

    const buttonBack = await waitFor(() => getByTestId('buttonBack'));

    fireEvent.press(buttonBack);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  test('should check if that when you finish the request, all fields appear', async () => {
    mock.onGet('/v1/restaurants/1').reply(200, { data: dataRestaurantMock });

    const { queryByTestId, getByTestId } = render(<Details />);

    await waitFor(() => {
      const viewLoading = queryByTestId('viewLoading');
      expect(viewLoading).not.toBeTruthy();

      const imageBackground = getByTestId('imageBackground');
      const logo = getByTestId('logo');
      const name = getByTestId('name');
      const description = getByTestId('description');
      const telephone = getByTestId('telephone');
      const website = getByTestId('website');
      const priceRange = getByTestId('priceRange');
      const openingHours = getByTestId('openingHours');
      const paymentMethods = getByTestId('paymentMethods');

      expect(imageBackground.props.source.uri).toBe(dataRestaurantMock.image);
      expect(logo.props.source.uri).toBe(dataRestaurantMock.logo);
      expect(name.props.children).toBe(dataRestaurantMock.name);
      expect(description.props.children).toBe(dataRestaurantMock.description);
      expect(telephone.props.children).toBe(dataRestaurantMock.telephone);
      expect(website.props.children).toBe(dataRestaurantMock.website);
      expect(priceRange.props.children).toBe(dataRestaurantMock.price_range);
      expect(openingHours.props.children).toBe(
        dataRestaurantMock.opening_hours,
      );
      expect(paymentMethods.props.children).toBe(
        dataRestaurantMock.payment_methods,
      );
    });
  });

  test.skip('should check if loading appears when you do not return data the first time', async () => {
    mock.onGet('/v1/restaurants/1').reply(200, { data: {} });

    const { getByTestId } = render(<Details />);
    const viewLoading = getByTestId('viewLoading');

    await waitFor(() => {
      expect(viewLoading).toBeTruthy();
    });
  });
});
