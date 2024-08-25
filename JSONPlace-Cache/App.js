import React, { useEffect, useState } from 'react';
import Posts from './screens/Posts';
import Comments  from './screens/Comments';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Aplicativo JSONPlaceCache
//Utiliza a JSONPlace API e SQLite para cache de dados local

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Comments" component={Comments} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;