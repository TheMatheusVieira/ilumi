import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal, Button, TouchableHighlight } from 'react-native';

const EventScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [novoConvidado, setNovoConvidado] = useState('');
  const [showAddConvite, setShowAddConvidado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [convidados, setConvidados] = useState([
    { key: '0', convite: 'CONVITE', pax: 'PAX', pp: 'PP'},

    { key: '1', convite: 'Convite 1', pax: '2', pp: '100' },
    { key: '2', convite: 'Convite 2', pax: '3', pp: '150' },
    // Adicione mais convidados aqui
  ]);

  const handleModalClose = () => {
    setShowModal(false);
    setNovoConvidado('');
  };

  const addConviteModalClose = () => {
    setShowAddConvidado(false);
    setNovoConvidado('');
  };

  const handleExport = () => {
    // Lógica de exportação de dados
    alert('Exportar dados não implementado ainda!');
  };

  const filteredData = convidados.filter(row =>
    row.convite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        // Lógica para quando o item for clicado
        setShowModal(true);
      }}
      activeOpacity={0.9}
    >
      <View style={styles.row}>
        <Text style={styles.cell}>{item.convite}</Text>
        <Text style={styles.cell}>{item.pax}</Text>
        <Text style={styles.cell}>{item.pp}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Evento</Text>
        <TouchableOpacity style={styles.menuIconContainer} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar convite"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddConvidado(true)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddConvite}
        onRequestClose={addConviteModalClose}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>ADICIONAR NOVO CONVIDADO</Text>
          <TextInput
            style={styles.modalInput}
            value={novoConvidado}
            onChangeText={(text) => setNovoConvidado(text)}
            placeholder="Nome do Convidado"
          />
          <TextInput
            style={styles.modalInput}
            value={novoConvidado}
            onChangeText={(text) => setNovoConvidado(text)}
            placeholder="PAX"
          />
          <TextInput
            style={styles.modalInput}
            value={novoConvidado}
            onChangeText={(text) => setNovoConvidado(text)}
            placeholder="PP"
          />
          <View style={styles.modalButtons}>
            <Button color={'black'} title="CONFIRMAR" onPress={handleModalClose} />
            <Button color={'black'} title="CANCELAR" onPress={addConviteModalClose} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <View style={styles.exportButtonContainer}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>Exportar</Text>
        </TouchableOpacity>
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

export default EventScreen;
