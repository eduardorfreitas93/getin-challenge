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
      <ContentLoading>
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
      >
        <ButtonBack onPress={handleGoBack}>
          <Image source={iconWhite} />
        </ButtonBack>
      </HeaderImageBackground>
      <Header>
        <ImageHeader source={{ uri: restaurant.logo }} />
      </Header>

      <Content>
        <ViewTitle>
          <Title>{restaurant.name}</Title>
        </ViewTitle>

        <ScrollView style={{ flex: 1 }}>
          <ViewDescribe>
            <DescribeTextTitle>Descrição</DescribeTextTitle>
            <DescribeTextInfo>{restaurant.description}</DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Contato</DescribeTextTitle>
            <DescribeTextInfo>{restaurant.telephone}</DescribeTextInfo>
            <DescribeTextInfo>{restaurant.website}</DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Daixa de preço</DescribeTextTitle>
            <DescribeTextInfo>{restaurant.price_range}</DescribeTextInfo>
          </ViewDescribe>

          <Spacing />

          <ViewDescribe>
            <DescribeTextTitle>Horário de funcionamento</DescribeTextTitle>
            <DescribeTextInfo>{restaurant.opening_hours}</DescribeTextInfo>
          </ViewDescribe>

          <ViewDescribe>
            <DescribeTextTitle>Formas de pagamento</DescribeTextTitle>
            <DescribeTextInfo>{restaurant.payment_methods}</DescribeTextInfo>
          </ViewDescribe>
        </ScrollView>
      </Content>
    </Container>
  );
}
