import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';

const EventScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [novoConvidado, setNovoConvidado] = useState('');
  const [showAddConvite, setShowAddConvidado] = useState(false);
  const [convidados, setConvidados] = useState([]);

  const [selectedConvidado, setSelectedConvidado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadConvidados();
  }, []);

  const loadConvidados = async () => {
    try {
      const storedConvidados = await AsyncStorage.getItem('convidados');
      if (storedConvidados) {
        setConvidados(JSON.parse(storedConvidados));
      }
    } catch (error) {
      console.log('Erro ao carregar convidados:', error);
    }
  };

  const saveConvidados = async (newConvidados) => {
    try {
      await AsyncStorage.setItem('convidados', JSON.stringify(newConvidados));
    } catch (error) {
      console.log('Erro ao salvar convidados:', error);
    }
  };

  const addConvidados = () => {
    const novoConvidadosArray = novoConvidado.split('\n').map((item, index) => {
        const [id, nome, pax, pp, mesa, setor] = item.split(',');

        // Garantindo que os valores existam e, se não, substituindo por uma string vazia
        return { 
            key: `${convidados.length + index}`, 
            convite: nome ? nome.trim() : '', 
            pax: pax ? pax.trim() : '', 
            pp: pp ? pp.trim() : '' 
        };
    });

    const updatedConvidados = [...convidados, ...novoConvidadosArray];
    setConvidados(updatedConvidados);
    saveConvidados(updatedConvidados);
    setShowAddConvidado(false);
    setNovoConvidado('');
};


  const exportToExcel = async () => {
    const worksheet = XLSX.utils.json_to_sheet(convidados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Convidados');

    const excelData = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

    const uri = FileSystem.documentDirectory + 'Finalizado.xlsx';
    await FileSystem.writeAsStringAsync(uri, excelData, { encoding: FileSystem.EncodingType.Base64 });

    await Sharing.shareAsync(uri);
  };

  const filteredData = convidados.filter(row =>
    row.convite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        setSelectedConvidado(item); // Armazena o convidado selecionado
        setShowEditModal(true); // Exibe a modal
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

<View style={styles.pesquisarConv}>
      <TextInput
          style={styles.input}
          placeholder="Pesquisar convite"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
</View>

      <View style={styles.inputContainer}>
        
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddConvidado(true)}>
          <Text style={styles.addButtonText}>+ Lista</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Convite</Text>
      </TouchableOpacity>

      </View>


      <Modal
        visible={showAddConvite}
        onRequestClose={() => setShowAddConvidado(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>ADICIONAR NOVOS CONVIDADOS</Text>
          <TextInput
            style={styles.modalInput}
            value={novoConvidado}
            onChangeText={(text) => setNovoConvidado(text)}
            placeholder="Insira os dados dos convidados no formato: _id,NOME,PAX,PP,MESA,SETOR"
            multiline={true}
          />
          <View style={styles.modalButtons}>
            <Button color={'black'} title="CONFIRMAR" onPress={addConvidados} />
            <Button color={'black'} title="CANCELAR" onPress={() => setShowAddConvidado(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

<Modal
  visible={showEditModal}
  onRequestClose={() => setShowEditModal(false)}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modal}>
    <Text style={styles.modalText}>Editar Convidado</Text>
    <TextInput
      style={styles.modalInput}
      value={selectedConvidado?.convite}
      onChangeText={(text) => setSelectedConvidado({ ...selectedConvidado, convite: text })}
      placeholder="Nome"
    />
    <TextInput
      style={styles.modalInput}
      value={selectedConvidado?.pax}
      onChangeText={(text) => setSelectedConvidado({ ...selectedConvidado, pax: text })}
      placeholder="PAX"
    />
    <TextInput
      style={styles.modalInput}
      value={selectedConvidado?.pp}
      onChangeText={(text) => setSelectedConvidado({ ...selectedConvidado, pp: text })}
      placeholder="PP"
    />
    <View style={styles.modalButtons}>
      <Button
        color={'black'}
        title="Salvar"
        onPress={() => {
          const updatedConvidados = convidados.map((convidado) =>
            convidado.key === selectedConvidado.key ? selectedConvidado : convidado
          );
          setConvidados(updatedConvidados);
          saveConvidados(updatedConvidados); // Salva as mudanças
          setShowEditModal(false); // Fecha a modal
        }}
      />
      <Button color={'black'} title="Cancelar" onPress={() => setShowEditModal(false)} />
    </View>
  </View>
</Modal>

      <View style={styles.exportButtonContainer}>
        <TouchableOpacity style={styles.exportButton} onPress={exportToExcel}>
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
  gap: 25,
  justifyContent: 'center'
  //paddingBottom: 100, // Ajuste o padding para caber a lista
},
input: {
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  padding: 8,
  paddingHorizontal: 3,
  marginRight: 10,
  marginLeft: 10,
},
addButton: {
  paddingHorizontal: 20,
  width: 120,
  paddingVertical: 5,
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
  marginBottom: 15,
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

modalInput: {
  backgroundColor: 'white',
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
  width: '80%',
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
ticonvites: {
  gap: 70,
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 10,
},
ticonviteslinha: {
 
},
pesquisarConv: {
  margin: 5,
  marginBottom: 10
},
});

export default EventScreen;
