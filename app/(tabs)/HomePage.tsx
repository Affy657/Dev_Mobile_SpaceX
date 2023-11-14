import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from '../../components/TopBar';
import Card from '../../components/Cards';

export default function TabHomePageScreen() {
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <ScrollView style={styles.scrollView} >
      <Card 
        id = {1}
        date='2021-01-01'
        title="Card Title api" 
        imageUri={require('../../assets/images/icon.png')} 
      />
      <Card 
        id = {2}
        date='2021-01-01'
        title="Card Title api" 
        imageUri={require('../../assets/images/icon.png')} 
      />
      <Card 
        id = {3}
        date='2021-01-01'
        title="Card Title api" 
        imageUri={require('../../assets/images/icon.png')} 
      />
      <Card 
        id = {4}
        date='2021-01-01'
        title="Card Title api" 
        imageUri={require('../../assets/images/icon.png')} 
      />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 25,
    width: '100%'
  },
});

