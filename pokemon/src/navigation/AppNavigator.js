import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
