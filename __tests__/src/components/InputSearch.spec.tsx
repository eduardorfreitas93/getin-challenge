/* eslint-disable import/extensions */
import React from 'react';
import { render } from '../../../testUtils';

import InputSearch from '../../../src/components/InputSearch';

describe('InputSearch.spec.tsx', () => {
  test('should check if placeholder has a default value', () => {
    const placeholder = 'Encontre um restaurante';
    const { getByTestId } = render(<InputSearch />);
    const input = getByTestId('input');

    expect(input.props.placeholder).toBe(placeholder);
  });
});
