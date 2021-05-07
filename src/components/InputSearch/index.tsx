import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Input, Image } from './styles';
import searchImg from '../../assets/search_red.png';

export default function InputSearch({ ...rest }: TextInputProps): JSX.Element {
  return (
    <Container>
      <Image source={searchImg} />
      <Input
        underlineColorAndroid="transparent"
        placeholder="Encontre um restaurante"
        {...rest}
      />
    </Container>
  );
}
