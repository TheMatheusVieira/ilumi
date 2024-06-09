import { SectionList, Button, View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import React from 'react'


export default function EventoAtual ({navigation}) {
  const [text, onChangeText] = React.useState('');

  return (
   <View style={styles.list}>

   <View>
      <Text style={styles.tievent}>Nome do Evento</Text>
    </View>


    <View style={styles.addevento}>
    <Button color='black' title="+" type="outline" style={styles.addevento}/>
    </View>

<SafeAreaView>
    <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Pesquisar convite"
      />
</SafeAreaView>

<SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />

   </View>
  );
}

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
  tievent:{
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
    
  });

