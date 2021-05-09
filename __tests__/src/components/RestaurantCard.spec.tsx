/* eslint-disable import/extensions */
import React from 'react';
import { render, fireEvent } from '../../../testUtils';

import RestaurantCard from '../../../src/components/RestaurantCard';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('RestaurantCard.spec.tsx', () => {
  const restaurant = {
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

  test('should check if that the source receives the image field', () => {
    const { getByTestId } = render(<RestaurantCard data={restaurant} />);
    const imageBackground = getByTestId('imageBackground');

    expect(imageBackground.props.source.uri).toBe(restaurant.image);
  });

  test('should check if that the text is named after the restaurant', () => {
    const { getByTestId } = render(<RestaurantCard data={restaurant} />);
    const title = getByTestId('title');

    expect(title.props.children).toBe(restaurant.name);
  });

  test('should check if clicking on the item redirects you to the details page with the id parameter', () => {
    const { getByTestId } = render(<RestaurantCard data={restaurant} />);
    const buttonItem = getByTestId('buttonItem');

    fireEvent.press(buttonItem);

    expect(mockedNavigate).toHaveBeenCalledWith('Details', {
      id: restaurant.id,
    });
  });
});
