import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from "../Components/card";

const props = {
    players: [
        {
            number: "33",
            name: "E. Tweedle",
            status: "Good",
            active: true,
            max: 3.2,
            battery: 0
        },
        {
            number: "13",
            name: "M. Laferriere",
            status: "Poor",
            active: true,
            max: 10,
            battery: 20
        },
        {
            number: "96",
            name: "C. Drysdale",
            status: "Okay",
            active: true,
            max: 5.7,
            battery: 40
        },
        {
            number: "54",
            name: "C. Blair",
            status: "Good",
            active: true,
            max: 0,
            battery: 60
        },
        {
            number: "7",
            name: "B. McAllister",
            status: "Poor",
            active: true,
            max: 9.8,
            battery: 80
        },
        {
            number: "87",
            name: "S. Crosby",
            status: "Off",
            active: false,
            max: 0,
            battery: 0
        }
    ]
};
export default class Players extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                {props.players.map((player, i) => {
                    return (<Card {...player} key={"player-" + i}/>);
                })}
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    padding: 20
  },
  text: {
    fontSize: 32,
    color: "#fff"
  }
});
