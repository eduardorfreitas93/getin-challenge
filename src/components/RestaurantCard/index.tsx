import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ItemButton, Title, ImageBackground } from './styles';

interface IRestaurantCard extends TouchableOpacityProps {
  data: {
    id: string;
    name: string;
    image: string;
  };
}

export default function RestaurantCard({
  data,
  ...rest
}: IRestaurantCard): JSX.Element {
  const navigation = useNavigation();

  function handleGoDetailsRestaurant() {
    navigation.navigate('Details', { id: data.id });
  }

  return (
    <ItemButton
      onPress={handleGoDetailsRestaurant}
      testID="buttonItem"
      {...rest}
    >
      <ImageBackground
        source={{ uri: data.image }}
        resizeMode="cover"
        imageStyle={{
          borderRadius: 8,
          opacity: 0.5,
        }}
        testID="imageBackground"
      >
        <Title testID="title">{data.name}</Title>
      </ImageBackground>
    </ItemButton>
  );
}
