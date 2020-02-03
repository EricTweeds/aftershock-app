import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MenuProvider } from 'react-native-popup-menu';

import reducer from "./reducer";

import Login from './Containers/login';
import Players from './Containers/players';
import Settings from './Containers/settings';

const client = axios.create({
  baseURL: "http://aftershock-api.herokuapp.com",
  responseType: "json"
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const MainNavigator = createStackNavigator({
    Home: {screen: Login},
    Players: {screen: Players},
    Settings: {screen: Settings}
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const Stack = createAppContainer(MainNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <Stack />
      </MenuProvider>
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
