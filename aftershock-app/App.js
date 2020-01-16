import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import Header from './Components/header';
import Players from './Containers/players';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <MenuProvider>
      <View style={styles.container}>
        <Header title="Players" />
        <Players />
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
