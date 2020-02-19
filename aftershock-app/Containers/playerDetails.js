import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

import Header from "../Components/header";
import GametimePlot from "../Components/gametimePlot";

let props = {
    number: "33",
    name: "Eric Tweedle",
    status: "Good",
    active: true,
    max: 3.2,
    battery: 100,
    birthday: "April 1, 1997",
    team: "Lincoln Blades",
    position: "Defense",
    gamesPlayed: 13,
    totalCollisions: 54,
    mild: 60,
    moderate: 30,
    severe: 5,
    currentGame: [
        { time: 1, acceleration: 12, rotational: 3},
        { time: 2, acceleration: 3.5, rotational: 2.1 },
        { time: 3, acceleration: 6.7, rotational: 2.5 },
        { time: 4, acceleration: 25, rotational: 5 },
        { time: 5, acceleration: 10, rotational: 2.9 },
        { time: 6, acceleration: 0.5, rotational: 0.5 },
        { time: 7, acceleration: 0.3, rotational: 0.3 },
        { time: 8, acceleration: 2, rotational: 1.2 },
        { time: 9, acceleration: 4.8, rotational: 1.5 },
        { time: 10, acceleration: 7.1, rotational: 1.7 },
        { time: 11, acceleration: 9.81, rotational: 9.81 },
        { time: 12, acceleration: 0.02, rotational: 0.1 }
    ]
}

export default class PlayerDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, active, battery, number, status, birthday, team, position, gamesPlayed, totalCollisions, max, mild, moderate, severe, currentGame } = props;

        let batteryIcon = "battery-empty";
        let batteryColor = '#ff0000';
        if (battery > 0 && battery <= 25) {
            batteryIcon = "battery-quarter";
        } else if (battery > 25 && battery <= 50) {
            batteryIcon = "battery-half";
            batteryColor = 'orange';
        } else if (battery > 50 && battery <= 75) {
            batteryIcon = "battery-three-quarters";
            batteryColor = 'black';
        } else if (battery > 75) {
            batteryIcon = "battery-full";
            batteryColor = 'black';
        }

        return (
            <View>
                <Header title={name} navigation={this.props.navigation} showMenu={true}/>
                <View style={styles.details}>
                    <View style={styles.statusRow}>
                        <Icon name="circle" type="font-awesome" color={active ? '#00bb00' : '#ff0000'} size={20} />
                        <Icon name={batteryIcon} type="font-awesome" color={batteryColor} />
                    </View>
                    <View style={styles.detailsRow}>
                        <View style={styles.picColumn}>
                            <View style={styles.pic}>
                                <Text style={styles.number}>{number}</Text>
                            </View>
                            {/* <View style={{...styles.status, backgroundColor: "#00bb00"}}>
                                <Text style={styles.statusText}>{status}</Text>
                            </View> */}
                        </View>
                        <View style={styles.dataColumn}>
                            <Text style={styles.title}>Concussion Risk:</Text>
                            <View style={styles.infoRow}><Text style={styles.info}>Mild Concussion: </Text><Text style={styles.info}>{mild}%</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Moderate Concussion: </Text><Text style={styles.info}>{moderate}%</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Severe Concussion: </Text><Text style={styles.info}>{severe}%</Text></View>
                        </View>
                        <View style={styles.dataColumn}>
                            <Text style={styles.title}>Personal Info:</Text>
                            <View style={styles.infoRow}><Text style={styles.info}>Birthday: </Text><Text style={styles.info}>{birthday}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Team: </Text><Text style={styles.info}>{team}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Position: </Text><Text style={styles.info}>{position}</Text></View>
                        </View>
                        <View style={styles.dataColumn}>
                            <Text style={styles.title}>Player Summary:</Text>
                            <View style={styles.infoRow}><Text style={styles.info}>Games Played: </Text><Text style={styles.info}>{gamesPlayed}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>All-Time Max: </Text><Text style={styles.info}>{max}g</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Total Collisions: </Text><Text style={styles.info}>{totalCollisions}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.currentGameData}>
                    <GametimePlot data={currentGame}/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    details: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        borderBottomWidth: 2
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    },
    picColumn: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    pic: {
        height: 150,
        width: 150,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    number: {
        fontSize: 80
    },
    status: {
        borderColor: "#000",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    statusText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    title: {
        fontSize: 20
    },
    info: {
        fontSize: 16
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dataColumn: {
        margin: 20,
        minWidth: 200
    },
    currentGameData: {
        backgroundColor: '#e3f2fd',
        height: "100%"
    }
});
