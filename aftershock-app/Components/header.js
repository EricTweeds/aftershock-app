import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { StyleSheet, Text, View } from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
 
export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
                <Menu>
                    <MenuTrigger><FontAwesomeIcon icon={faEllipsisV} size={24}/></MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => console.log("a")} text="a" />
                        <MenuOption onSelect={() => console.log("b")} text="b" />
                        <MenuOption onSelect={() => console.log("c")} text="c" />
                    </MenuOptions>
                </Menu>
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
