import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';

import {
  Container,
  Content,
  Header,
  Title,
  DescribeTextTitle,
  DescribeTextInfo,
  HeaderImageBackground,
  ImageHeader,
  ViewTitle,
  ViewDescribe,
  Spacing,
  ContentLoading,
  ButtonBack,
} from './styles';

import api from '../../config/api';
import { IRestaurant } from '../../store/ducks/restaurant/types';
import iconWhite from '../../assets/chevron_left_white.png';

type ParamList = {
  Details: {
    id: string;
  };
};

export default function Details(): JSX.Element {
  const route = useRoute<RouteProp<ParamList, 'Details'>>();
  const navigation = useNavigation();

  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [loading, setLoading] = useState(true);

  async function getRestaurant() {
    try {
      const { data } = await api.get(`/v1/restaurants/${route.params.id}`);

      setRestaurant(data.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  if (!restaurant || loading) {
    return (
      <ContentLoading testID="viewLoading">
        <ActivityIndicator />
      </ContentLoading>
    );
  }

  return (
    <Container>
      <HeaderImageBackground
        source={{ uri: restaurant.image }}
        imageStyle={{
          borderRadius: 8,
          opacity: 0.5,
        }}
        testID="imageBackground"
      >
        <ButtonBack onPress={handleGoBack} testID="buttonBack">
          <Image source={iconWhite} />
        </ButtonBack>
      </HeaderImageBackground>
      <Header>
        <ImageHeader source={{ uri: restaurant.logo }} testID="logo" />
      </Header>

      <Content>
        <ViewTitle>
          <Title testID="name">{restaurant.name}</Title>
        </ViewTitle>

        <ScrollView style={{ flex: 1 }}>
          <ViewDescribe>
            <DescribeTextTitle>Descrição</DescribeTextTitle>
            <DescribeTextInfo testID="description">
              {restaurant.description}
            </DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Contato</DescribeTextTitle>
            <DescribeTextInfo testID="telephone">
              {restaurant.telephone}
            </DescribeTextInfo>
            <DescribeTextInfo testID="website">
              {restaurant.website}
            </DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Daixa de preço</DescribeTextTitle>
            <DescribeTextInfo testID="priceRange">
              {restaurant.price_range}
            </DescribeTextInfo>
          </ViewDescribe>

          <Spacing />

          <ViewDescribe>
            <DescribeTextTitle>Horário de funcionamento</DescribeTextTitle>
            <DescribeTextInfo testID="openingHours">
              {restaurant.opening_hours}
            </DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Formas de pagamento</DescribeTextTitle>
            <DescribeTextInfo testID="paymentMethods">
              {restaurant.payment_methods}
            </DescribeTextInfo>
          </ViewDescribe>
        </ScrollView>
      </Content>
    </Container>
  );
}
