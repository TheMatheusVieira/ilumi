import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyEventsScreen from './Eventos/MyEventsScreen'; 
import EventScreen from './Eventos/EventScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000, // Duração da transição em milissegundos
        useNativeDriver: true,
      }).start(() => setShowWelcome(false));
    }, 2000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showWelcome ? (
        <Animated.View style={{ ...styles.welcomeContainer, opacity }}>
          <Text style={styles.welcomeText}>Olá, bem-vindo(a)!</Text>
        </Animated.View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Ilumi</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NextPage')}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const NextPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ilumi</Text>
        <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../app-ilumi/assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('MyEvents')}>
          <Text style={styles.buttonTextMenu}>Meus eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMenu}>
          <Text style={styles.buttonTextMenu}>Novo evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMenu}>
          <Text style={styles.buttonTextMenu}>Minhas listas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NextPage" component={NextPage} options={{ headerShown: false }} />
        <Stack.Screen name="MyEvents" component={MyEventsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Evento" component={EventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 2,
    paddingVertical: 7,
    paddingHorizontal: 60,
    backgroundColor: 'black',
    borderRadius: 18,
    alignItems: 'center',

    backgroundColor: 'white',

    borderWidth: 1,
    borderBottomColor: '#b8860b',
    borderTopColor: '#b8860b',
    borderRightColor: '#b8860b',
    borderLeftColor: '#b8860b',
  },
  buttonMenu: {
    marginTop: 2,
    margin: 25,
    width: 220,
    height: 180,
    backgroundColor: 'transparent',
    borderRadius: 4,
    alignItems: 'center',

    borderWidth: 1,
    borderBottomColor: '#b8860b',
    borderTopColor: '#b8860b',
    borderRightColor: '#b8860b',
    borderLeftColor: '#b8860b',
  },
  buttonTextMenu: {
    color: '#b8860b',
    fontSize: 20,
    marginTop: 70,
  },
  buttonText: {
    color: '#b8860b',
    fontSize: 18,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  headerTitle: {
    color: '#FFA500', // Cor laranja do título Ilumi
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  menuIconContainer: {
    padding: 5,
    paddingTop: 35,
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
});