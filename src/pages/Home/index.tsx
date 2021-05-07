import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  Header,
  Title,
  SubTitle,
  HeaderImageBackground,
  ContentList,
  ViewSearch,
  ContainerListView,
} from './styles';

import HeaderImage from '../../assets/header.png';
import InputSearch from '../../components/InputSearch';
import { ApplicationState } from '../../store';
import { addRestaurants } from '../../store/ducks/restaurant/actions';
import RestaurantList from '../../components/RestaurantList';

export default function Home(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state: ApplicationState) => state.restaurants.dataRestaurants,
  );

  const loadingMore = useSelector(
    (state: ApplicationState) => state.restaurants.loading,
  );

  const [page, setPage] = useState(1);

  function handelFetchMore(distance: number) {
    if (distance < 1) return;

    setPage(oldValue => oldValue + 1);
  }

  function handleFocus() {
    navigation.navigate('Search');
  }

  useEffect(() => {
    dispatch(addRestaurants(page));
  }, [page]);

  return (
    <Container>
      <HeaderImageBackground source={HeaderImage}>
        <Content>
          <Header>
            <Title>Descubra novos sabores</Title>
            <SubTitle>Aqui eu converso com você sobre nossa proposta</SubTitle>
          </Header>
        </Content>
      </HeaderImageBackground>

      <ContentList>
        <ViewSearch>
          <InputSearch onFocus={handleFocus} />
        </ViewSearch>

        <ContainerListView>
          <RestaurantList
            title="Restaurantes"
            colorActivityIndicator={theme.colors.primary}
            loadingMore={loadingMore}
            restaurants={restaurants}
            handelFetchMore={handelFetchMore}
          />
        </ContainerListView>
      </ContentList>
    </Container>
  );
}
