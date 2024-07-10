import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Ilumi</Text>

    <View style={styles.botao}>
    <Button color='black' title="COMEÇAR" type="outline" class='estilobotao' 
    onPress={() => navigation.navigate('Listas')}/>
    </View>

  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botao: {
      paddingTop: 7,
    }
  });