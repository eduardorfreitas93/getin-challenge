import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Details from '../pages/Details';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator headerMode="none">
      <stackRoutes.Screen name="Home" component={Home} />
      <stackRoutes.Screen name="Search" component={Search} />
      <stackRoutes.Screen name="Details" component={Details} />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
