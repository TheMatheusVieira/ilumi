import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

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

  const filteredData = data.filter(item => 
    item.NOME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.NOME}</Text>
      <Text style={styles.listText}>{item.PAX}</Text>
      <Text style={styles.listText}>{item.PP}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Evento</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.ContainerConvite}>
          <View style={styles.BoxConvite} />
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

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.NOME}
        />

        <View style={styles.exportButtonContainer}>
          <TouchableOpacity style={styles.exportButton}>
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
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuIconContainer: {
    padding: 5,
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  ContainerConvite: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  BoxConvite: {
    width: 200,
    height: 10,
    backgroundColor: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
    marginBottom: 50,
  },
  counterButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 30,
    marginHorizontal: 10,
    width: 100,
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: 'white',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    width: 200,
    marginRight: 10,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listText: {
    fontSize: 16,
    width: '30%',
  },
  exportButtonContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  exportButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EventScreen;
