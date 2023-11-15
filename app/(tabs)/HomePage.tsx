import React from 'react';
import { 
  StyleSheet,
  View,
 } from 'react-native';

import TopBar from '../../components/TopBar';
import Cards from '../../components/Cards';



export default function TabHomePageScreen() {
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <Cards></Cards>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
