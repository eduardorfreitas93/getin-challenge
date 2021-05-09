import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  SubTitle,
  ContentList,
  ViewSearch,
  ButtonBack,
  ContainerListView,
} from './styles';

import iconBack from '../../assets/chevron_left_black.png';

import InputSearch from '../../components/InputSearch';
import { ApplicationState } from '../../store';
import { addRestaurantsSearch } from '../../store/ducks/restaurant/actions';
import RestaurantList from '../../components/RestaurantList';

export default function Search(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state: ApplicationState) => state.restaurants.dataRestaurantsSearch,
  );

  const loadingMore = useSelector(
    (state: ApplicationState) => state.restaurants.loading,
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();

  async function handleSearch(text: string) {
    setSearch(text);
    dispatch(addRestaurantsSearch(page, text.toLowerCase()));
  }

  function handelFetchMore(distance: number) {
    if (distance < 1) return;

    setPage(oldValue => oldValue + 1);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    dispatch(addRestaurantsSearch(page, search));
  }, [page]);

  return (
    <Container>
      <ButtonBack onPress={handleGoBack} testID="buttonBack">
        <Image source={iconBack} />
      </ButtonBack>
      <Header>
        <SubTitle>Resultados para</SubTitle>
        <Title>Termo pesquisado</Title>
      </Header>

      <ContentList>
        <ViewSearch>
          <InputSearch
            autoFocus
            onChangeText={handleSearch}
            testID="inputSearch"
          />
        </ViewSearch>

        <ContainerListView testID="viewList">
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
