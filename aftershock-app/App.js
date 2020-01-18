import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from "./reducer";

import Login from "./Containers/login";
import Header from './Components/header';
import Players from './Containers/players';

const client = axios.create({
  baseURL: "http://aftershock-api.herokuapp.com",
  responseType: "json"
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Header title="Players" />
        <Players /> */}
        <Login />
      </View>
    </Provider>
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
