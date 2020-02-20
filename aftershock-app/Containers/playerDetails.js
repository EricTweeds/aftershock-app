import React, { Component } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';

import { getPlayerData } from "../reducer";

import Header from "../Components/header";
import GametimePlot from "../Components/gametimePlot";

class PlayerDetails extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount() {
        const { playerId } = this.props.navigation.state.params;
        this.props.getPlayerData(playerId);
    }
    
    handleBack() {
        this.props.navigation.navigate('Players')
    }

    render() {
        const { name, active, battery, number, status, birthday, team, position, gamesPlayed, totalCollisions, max, mild, moderate, severe, currentGame } = this.props.data;

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
                        <Button title="Back to Team" onPress={() => this.handleBack()} />
                        <Button title="Report Injury" onPress={() => this.handleBack()} />
                        {/* <Icon name="circle" type="font-awesome" color={active ? '#00bb00' : '#ff0000'} size={20} />
                        <Icon name={batteryIcon} type="font-awesome" color={batteryColor} /> */}
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
                    {currentGame ? <GametimePlot data={currentGame}/> : null}
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return { data: state.player }
};

const mapDispatchToProps = {
    getPlayerData
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);


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
        padding: 10,
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
