import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { TitleList, ViewTitleList } from './styles';
import RestaurantCard from '../RestaurantCard';
import { IRestaurant } from '../../store/ducks/restaurant/types';

interface IRestaurantList {
  title: string;
  restaurants: IRestaurant[];
  loadingMore: boolean;
  colorActivityIndicator: string;
  handelFetchMore: (distance: number) => void;
}

export default function RestaurantList({
  title,
  restaurants,
  colorActivityIndicator,
  loadingMore,
  handelFetchMore,
}: IRestaurantList): JSX.Element {
  return (
    <>
      <ViewTitleList>
        <TitleList testID="title">{title}</TitleList>
      </ViewTitleList>

      <FlatList
        data={restaurants}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <RestaurantCard key={item.id} data={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => handelFetchMore(distanceFromEnd)}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              color={colorActivityIndicator}
              testID="activityIndicator"
            />
          ) : (
            <></>
          )
        }
        getItemLayout={(data, index) => ({
          length: 177,
          offset: 177 * index,
          index,
        })}
        testID="list"
      />
    </>
  );
}
