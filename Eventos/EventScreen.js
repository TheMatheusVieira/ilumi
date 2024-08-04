import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([
    ['CONVITE', 'PAX', 'PP'],
    ...Array.from({ length: 8 }, () => ['teste', 'teste', 'teste'])
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('excelData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
  }, []);

  const handleExport = () => {
    // Lógica de exportação de dados
    alert('Exportar dados não implementado ainda!');
  };

  const filteredData = data.filter(row =>
    row.some(cell => cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Evento</Text>
        <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.ContainerConvite}>
          <Text style={{ color: 'white' }}>Teste</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.counterButton}>
            <Text style={styles.counterButtonText}>Menos 1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.counterButton}>
            <Text style={styles.counterButtonText}>Mais 1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar convite"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {item.map((cell, index) => (
                  <Text key={index} style={styles.cell}>
                    {cell}
                  </Text>
                ))}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.exportButtonContainer}>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Text style={styles.exportButtonText}>Exportar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
header: {
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
ContainerConvite: {
  marginVertical: 25,
  marginLeft: 30,
  marginRight: 30,
  padding: 20,
  backgroundColor: 'black',
  borderRadius: 10,
},
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 20,
  width: '100%',
  marginBottom: 20,
},
counterButton: {
  backgroundColor: 'black',
  borderRadius: 10,
  marginHorizontal: 8,
  width: 100,
  height: 30,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',

  borderWidth: 1,
  borderBottomColor: '#b8860b',
  borderTopColor: '#b8860b',
  borderRightColor: '#b8860b',
  borderLeftColor: '#b8860b',
},
counterButtonText: {
  color: 'white',
  fontSize: 15,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5,

  //paddingBottom: 100, // Ajuste o padding para caber a lista
},
input: {
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  padding: 8,
  width: 230,
  marginRight: 10,
  marginLeft: 10,
},
addButton: {
  width: 90,
  height: 30,
  backgroundColor: 'black',
  borderRadius: 10,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',

  borderWidth: 1,
  borderBottomColor: '#b8860b',
  borderTopColor: '#b8860b',
  borderRightColor: '#b8860b',
  borderLeftColor: '#b8860b',
},
addButtonText: {
  color: 'white',
  fontSize: 15,
},
exportButtonContainer: {
  position: 'static',
  marginTop: 15,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
},
exportButton: {
  paddingVertical: 5,
  paddingHorizontal: 14,
  backgroundColor: 'black',
  borderRadius: 10,

  borderWidth: 1,
  borderBottomColor: '#b8860b',
  borderTopColor: '#b8860b',
  borderRightColor: '#b8860b',
  borderLeftColor: '#b8860b',
},
exportButtonText: {
  color: 'white',
  fontSize: 15,
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
cell: {
  flex: 1,
  textAlign: 'center',
},
});

export default EventScreen;
