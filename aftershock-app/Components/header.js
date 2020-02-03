import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";
 
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onBack = this.onBack.bind(this);
    }

    onBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
                {this.props.showMenu ? 
                <Menu>
                    <MenuTrigger><Icon name="ellipsis-v" type="font-awesome"/></MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => this.props.navigation.navigate('Settings')} text="Settings" />
                    </MenuOptions>
                </Menu> :
                <Icon onPress={this.onBack} name="arrow-right" type="font-awesome"/>
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
  }
});
