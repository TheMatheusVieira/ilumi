import { FlatList, Button, View, Text, StyleSheet, TextInput, SafeAreaView, TouchableHighlight, Modal, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaDeEventos ({navigation}) {

  //Variável para pesquisa
    const [searchTerm, setSearchTerm] = useState('');

    //Variável linha de cada evento
  const [newKey, setNewKey] = useState(''); 
 
  //Salvar evento novo na lista
// Load data from AsyncStorage on component mount
useEffect(() => {
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('eventData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  loadData();
}, []);

//LISTA DE EVENTOS
    const [data, setData] = useState([
      {key: 'Evento 1'},
      {key: 'Evento 2'},
      {key: 'Evento 3'},
      {key: 'Evento 4'},
      {key: 'Evento 5'},
      {key: 'Evento 6'},
      {key: 'Evento 7'},
      {key: 'Evento 8'},
      {key: 'Evento 9'},
      {key: 'Evento 10'},
      {key: 'Evento 11'},
      {key: 'Evento 12'},
      {key: 'Evento 13'},
      {key: 'Evento 14'},
      {key: 'Evento 15'},
    ]);

    const [showAddEvent, setShowAddEvent] = useState(false);
    const [eventModalVisible, setEventModalVisible] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const selectedEvent = React.useRef(null); 

    const filteredData = data.filter((event) =>
      event.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
      
    // DEFINE VISIBILIDADE DOS ITENS NA TELA
        const renderItem = ({ item }) => (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => { 
            //  setselectedEvent(item);
              setShowModal(true);
              setEventModalVisible(true);
            }}
            activeOpacity={0.9}
          >
            <Text style={styles.item}>{item.key}</Text>
          </TouchableHighlight>
        );
      
        const handleModalClose = () => {
          setShowModal(false);
          setNewKey('');
        };

        const addEventModalClose = () => {
          setShowAddEvent(false);
          setNewKey('');
        };

        const handleAddKey = () => {
          if (newKey.trim()) {
            // Add the new key to the data array
            const newData = [...data, { key: newKey }];
            setData(newData);

            // Save the updated data to AsyncStorage
      AsyncStorage.setItem('eventData', JSON.stringify(newData))
      .then(() => console.log('Eventos salvos com sucesso!'))
      .catch((error) => console.error('Erro ao salvar eventos:', error));


            // Clear the new key input
            setNewKey('');
            // Close the modal
            setShowAddEvent(false);
          } else {
            setShowAddEvent(true);
            // alert('Por favor, digite um nome para o evento.');
          }
        };
      
// Function to delete an event
const handleDeleteEvent = (eventToDelete) => {
  const filteredData = data.filter((event) => event !== eventToDelete);
  setData(filteredData);

  // Save the updated data to AsyncStorage
  AsyncStorage.setItem('eventData', JSON.stringify(filteredData))
  .then(() => console.log('Evento excluído com sucesso!'))
  .catch((error) => console.error('Erro ao excluir evento:', error));
};


        const handleNavigateToEvent = () => {
          navigation.navigate('Evento', { selectedEvent: selectedEvent.current }); 
          setShowModal(false);
        };

    const onPress = (event) => {
      console.log('Evento pressionado:', event.key);
  };  

  
  return (
    <View style={styles.list}>
           <View>
             <Text style={styles.tilista}>Lista de Eventos</Text>
           </View>
    
           <View style={styles.addevento}>
             <Button color="black" title="+" type="outline" style={styles.addevento} onPress={handleAddKey}/>
           </View>
    
           <SafeAreaView>
             <TextInput
              style={styles.input}
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
              placeholder="Pesquisar evento"
            />

            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
            
          </SafeAreaView>
    

          <Modal           //MODAL DO ADICIONAR NOVO EVENTO
  visible={showAddEvent}
  onRequestClose={addEventModalClose}
  animationType="slide" // Optional for animation
  transparent={true} // Optional for transparency
>
  <View style={styles.modal}>
    <Text style={styles.modalText}>Adicionar Novo Evento</Text>
    <TextInput
      style={styles.modalInput}
      value={newKey}
      onChangeText={(text) => setNewKey(text)}
      placeholder="Nome do Evento"
    />
    <View style={styles.modalButtons}>
      <Button color={'black'} title="CONFIRMAR" onPress={handleAddKey} />
      <Button color={'black'} title="CANCELAR" onPress={addEventModalClose} />
    </View>
  </View>
</Modal>


          <Modal                 //MODAL DA LISTA DE OPÇÕES DE CADA EVENTO
            visible={showModal}
            onRequestClose={handleModalClose}
            animationType="slide" // Optional for animation
            transparent={true} // Optional for transparency
          >
            <View style={styles.modal}>
              <View style={styles.quadro}>
              <Text style={styles.modalText}>DESEJA ENTRAR NO EVENTO "{selectedEvent.current?.key}"?</Text>
              <View style={styles.modalButtons}>
                <Button color={'black'} title="ABRIR - Lista de convidados" onPress={handleNavigateToEvent} />
                <Button color={'black'} title='ALTERAR - Nome do evento'/>
                <Button color={'black'} title='IMPORTAR - Planilha Excel.XLS'/>
                <Button color={'black'} title='EXPORTAR - Planilha Excel.CSV'/>
                <Button color={'black'} title='EXCLUIR EVENTO'/> 
                <Button color={'black'} title="FECHAR" onPress={handleModalClose} />
              </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

//ESTILIZAÇÃO DA PÁGINA
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tilista:{
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',

    shadowColor: 'black',
  },
    list: {
      flex: 1,
      paddingTop: 22,
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 285,
      marginLeft: 10,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    addevento:{
      backgroundColor: 'black',
      position: 'absolute',
      alignItems: 'center',
      width: 40,
      height: 40,
      marginLeft: 315,
      marginTop: 88,
      marginRight: 10,
    },
    modal: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          
        },
        modalText: {
          fontSize: 18,
          color: 'black',
          marginBottom: 15,
          fontWeight: 'bold'
        },
        modalButtons: {
          flexDirection: 'column',
          justifyContent: 'space-around',
          gap: 10,
          width: '75%',
        },
        quadro: {
          backgroundColor: 'white',
          paddingBottom: 20,
          paddingTop: 10,
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }
  });
  