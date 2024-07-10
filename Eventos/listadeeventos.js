import { FlatList, Button, View, Text, StyleSheet, TextInput, SafeAreaView, TouchableHighlight, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaDeEventos({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newKey, setNewKey] = useState('');
  const [data, setData] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const selectedEvent = React.useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('eventData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log('Dados carregados:', parsedData);
          setData(parsedData);
        }
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    loadData();
  }, []);

  const filteredData = data.filter((event) =>
    typeof event.key === 'string' && event.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        selectedEvent.current = item;
        setShowModal(true);
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
      const newData = [...data, { key: newKey }];
      setData(newData);
      AsyncStorage.setItem('eventData', JSON.stringify(newData))
        .then(() => console.log('Eventos salvos com sucesso!'))
        .catch((error) => console.error('Erro ao salvar eventos:', error));
      setNewKey('');
      setShowAddEvent(false);
    } else {
      console.error('Por favor, digite um nome para o evento.');
    }
  };

  const handleRemoveKey = () => {
    if (selectedEvent.current) {
      const newData = data.filter(item => item.key.toLowerCase() !== selectedEvent.current.key.toLowerCase());
      setData(newData);
      AsyncStorage.setItem('eventData', JSON.stringify(newData))
        .then(() => console.log('Eventos salvos com sucesso!'))
        .catch((error) => console.error('Erro ao salvar eventos:', error));
      setShowModal(false);
    } else {
      console.error('Chave inválida:', newKey);
    }
  };

  const handleNavigateToEvent = () => {
    navigation.navigate('Evento', { selectedEvent: selectedEvent.current });
    setShowModal(false);
  };

  return (
    <View style={styles.list}>
      <View style={styles.addevento}>
        <Button color="black" title="+" type="outline" onPress={() => setShowAddEvent(true)} />
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

      <Modal
        visible={showAddEvent}
        onRequestClose={addEventModalClose}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>ADICIONAR NOVO EVENTO</Text>
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

      <Modal
        visible={showModal}
        onRequestClose={handleModalClose}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.quadro}>
            <Text style={styles.modalText}>DESEJA ENTRAR NO EVENTO "{selectedEvent.current?.key}"?</Text>
            <View style={styles.modalButtons}>
              <Button color={'black'} title="ABRIR - Lista de convidados" onPress={handleNavigateToEvent} />
              <Button color={'black'} title='ALTERAR - Nome do evento' />
              <Button color={'black'} title='IMPORTAR - Planilha Excel.XLS' />
              <Button color={'black'} title='EXPORTAR - Planilha Excel.CSV' />
              <Button color={'black'} title='EXCLUIR EVENTO' onPress={handleRemoveKey} />
              <Button color={'black'} title="FECHAR" onPress={handleModalClose} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// //ESTILIZAÇÃO DA PÁGINA
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
      marginTop: 35,
      marginRight: 10,
    },
    modal: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          
        },
        modalText: {
          fontSize: 19,
          color: 'white',
          textShadowRadius: 9,
        textShadowColor: 'black',
          marginBottom: 11,
          fontWeight: "bold",
        },
        modalButtons: {
          flexDirection: 'column',
          justifyContent: 'space-around',
          gap: 10,
          width: '75%',
        },
        quadro: {
          // backgroundColor: 'white',
          paddingBottom: 20,
          paddingTop: 10,
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: 'center',
          alignItems: 'center',
         }
});