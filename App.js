import { Button, View, Text, StyleSheet } from 'react-native';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home/myhome'
import Listas from './Eventos/listadeeventos'
import Evento from './selecionado/eventoatual'

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' >
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Listas' component={Listas} />
    <Stack.Screen name='Evento' component={Evento} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}