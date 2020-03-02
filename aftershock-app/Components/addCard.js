import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";
 
export default class AddPlayerCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.number}><Icon name="user-plus" type="font-awesome" size={40}/></View>
                <Text style={styles.name}>Add Player</Text> 
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 20,
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 1,
    margin: 20,
    width: 200,
    height: 270.5
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch"
  },
  line: {
    height: 1,
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    margin: 10
  },
  number: {
    fontSize: 80
  },
  name: {
    fontSize: 24
  },
  status: {
    fontSize: 16
  },
  max: {
    fontSize: 16
  }
});
