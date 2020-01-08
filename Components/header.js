import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
                <Menu>
                    <MenuTrigger><Text style={styles.text}>Options</Text></MenuTrigger>
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
    height: 150,
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
