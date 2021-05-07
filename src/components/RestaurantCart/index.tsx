import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ItemButton, Title, ImageBackground } from './styles';

interface IRestaurantCart extends TouchableOpacityProps {
  data: {
    id: string;
    name: string;
    image: string;
  };
}

export default function RestaurantCart({
  data,
  ...rest
}: IRestaurantCart): JSX.Element {
  const navigation = useNavigation();

  function handleGoDetailsRestaurant() {
    navigation.navigate('Details', { id: data.id });
  }

  return (
    <ItemButton onPress={handleGoDetailsRestaurant} {...rest}>
      <ImageBackground
        source={{ uri: data.image }}
        resizeMode="cover"
        imageStyle={{
          borderRadius: 8,
          opacity: 0.5,
        }}
      >
        <Title>{data.name}</Title>
      </ImageBackground>
    </ItemButton>
  );
}
