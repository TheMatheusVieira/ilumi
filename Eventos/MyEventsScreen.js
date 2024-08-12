import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput, Image, SafeAreaView, Modal, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyEventsScreen = ({ navigation }) => {
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
    const newKeyStr = String(newKey).trim();
    if (newKeyStr) {
      const eventExists = data.some(event => String(event.key).toLowerCase() === newKeyStr.toLowerCase());
      if (eventExists) {
        console.error('Evento já existe. Por favor, escolha outro nome.');
        return;
      }
      const newData = [...data, { key: newKeyStr }];
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
    const newData = data.filter(item => item.key !== selectedEvent.current.key);
    setData(newData);
    AsyncStorage.setItem('eventData', JSON.stringify(newData))
      .then(() => console.log('Evento removido com sucesso!'))
      .catch((error) => console.error('Erro ao remover evento:', error));
    setShowModal(false);
  } else {
    console.error('Chave inválida:', newKey);
  }
};

const NavegarParaEvento = () => {
  navigation.navigate('Evento', { eventName: selectedEvent.current.key });
  setShowModal(false);
};


return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Listas</Text>
      <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>

    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.textInput} 
        placeholder="Pesquisar evento"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.newButton} onPress={() => setShowAddEvent(true)}>
        <Text style={styles.newButtonText}>Novo</Text>
      </TouchableOpacity>
    </View>

    <SafeAreaView>
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
            <Button color={'black'} title="ABRIR - Lista de convidados" onPress={NavegarParaEvento} />
            <Button color={'black'} title='ALTERAR - Nome do evento' />
            <Button color={'black'} title='EXCLUIR EVENTO' onPress={handleRemoveKey} />
            <Button color={'black'} title="FECHAR" onPress={handleModalClose} />
          </View>
        </View>
      </View>
    </Modal>
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 245,
    borderBottomColor: 'black',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    marginLeft: 8,
  },
  newButton: {
    backgroundColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
    margin: 10,
    paddingTop: 4,
    marginTop: 16,
  },
  newButtonText: {
    color: 'white',
    fontSize: 18,
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
    textShadowRadius: 5,
    textShadowColor: 'black',
    marginBottom: 5,
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
   },
   item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default MyEventsScreen;
