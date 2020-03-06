import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";

import { removeItem } from '../Tools/asyncStorageTool';
 
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this);
        this.logout = this.logout.bind(this);
    }

    onBack() {
        this.props.navigation.goBack();
    }

    logout() {
        removeItem('token');
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title ? this.props.title : "AfterShock"}</Text>
                {this.props.showMenu ? 
                <Menu>
                    <MenuTrigger style={styles.menuTrigger}><Icon name="ellipsis-v" type="font-awesome"/></MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => this.props.navigation.navigate('Settings')} text="Settings" />
                        <MenuOption onSelect={() => this.logout()} text="Logout" />
                    </MenuOptions>
                </Menu> :
                <Icon onPress={this.onBack} name="arrow-left" type="font-awesome"/>
                }

            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: 20,
    marginTop: 20
  },
  text: {
    fontSize: 32
  },
  menuTrigger: {
      width: 20
  }
});
