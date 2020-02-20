import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Picker } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';

import { getPlayerData } from "../reducer";

import Header from "../Components/header";
import GametimePlot from "../Components/gametimePlot";

class PlayerDetails extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handlePointTouch = this.handlePointTouch.bind(this);
        this.handlePickerChange = this.handlePickerChange.bind(this);
    }

    state = {};

    componentDidMount() {
        const { playerId } = this.props.navigation.state.params;
        this.props.getPlayerData(playerId);
        this.setState({game: 0});
    }
    
    handleBack() {
        this.props.navigation.navigate('Players')
    }

    handlePointTouch(data) {
        if (data.length) {
            this.setState({selected: data[0]});
        }
    }

    handlePickerChange(itemValue) {
        if (itemValue) {
            this.setState({game: itemValue});
        }
    }

    render() {
        const { name, active, battery, risk, age, team, position, gamesPlayed, totalCollisions, max, currentGame, height, weight } = this.props.data;

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

        let riskColor;
        let riskText = "unknown";

        if (risk < 40) {
            riskColor = "#64a338";
            riskText = "Good";
        } else if (risk >= 40 && risk < 60) {
            riskColor = "#ffcc00";
            riskText = "Warning";
        } else {
            riskColor = "#e03b24";
            riskText = "Danger"
        }

        return (
            <View style={styles.container}>
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
                            <View style={{...styles.pic, backgroundColor: riskColor}}>
                                <Text style={styles.number}>{risk}%</Text>
                                <Text style={styles.risk}>{riskText}</Text>
                            </View>
                            <Text style={{...styles.onlineStatus, color: active ? "#64a338" : '#e03b24'}}>{active ? "Online" : "Offline"}</Text>
                            {/* <View style={{...styles.status, backgroundColor: "#00bb00"}}>
                                <Text style={styles.statusText}>{status}</Text>
                            </View> */}
                        </View>
                        <View style={styles.dataColumn}>
                            <View style={styles.infoRow}><Text style={styles.info}>Team: </Text><Text style={styles.info}>{team}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Position: </Text><Text style={styles.info}>{position}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Height: </Text><Text style={styles.info}>{height}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Weight: </Text><Text style={styles.info}>{weight}</Text></View>
                        </View>
                        <View style={styles.dataColumn}>
                            <View style={styles.infoRow}><Text style={styles.info}>Age: </Text><Text style={styles.info}>{age}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Games Played: </Text><Text style={styles.info}>{gamesPlayed}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>All-Time Max: </Text><Text style={styles.info}>{max}g</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Total Collisions: </Text><Text style={styles.info}>{totalCollisions}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.currentGameData}>
                    <View style={styles.plot}>
                        {currentGame ? <GametimePlot data={currentGame} handleTouch={this.handlePointTouch} selected={this.state.selected}/> : null}
                    </View>
                    <View style={styles.plotDetails}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.game}
                                    style={styles.picker}
                                    mode="dropdown"
                                    onValueChange={(itemValue, index) => {
                                        this.handlePickerChange(itemValue, index)
                                    }}
                                >
                                    <Picker.Item label="Current Game" value={1} />
                                    <Picker.Item label="Feb. 12" value={2} />
                                </Picker>
                            </View>
                            {this.state.selected ? <View style={styles.pointData}>
                            <View style={styles.pointRow}><Text style={styles.info}>Time: </Text><Text style={styles.info}>{this.state.selected.time}</Text></View>
                            <View style={styles.pointRow}><Text style={styles.info}>Linear: </Text><Text style={styles.info}>{this.state.selected.acceleration}</Text></View>
                            <View style={styles.pointRow}><Text style={styles.info}>Rotational: </Text><Text style={styles.info}>{this.state.selected.rotational}</Text></View>
                            </View> : null}
                            <Button title="More Details" />
                    </View>
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
    container: {
        height: "100%",

    },
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
        marginRight: 50
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
        fontSize: 60,
        color: "#fff"
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
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 5
    },
    dataColumn: {
        minWidth: 300,
        justifyContent: "center"
    },
    header: {
        backgroundColor: "#FFF",
        padding: 5
    },
    currentGameData: {
        backgroundColor: '#e3f2fd',
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    deviceStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        marginRight: 10,
        marginLeft: 10
    },
    pointData: {
        backgroundColor: "#fff",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    plotDetails: {
        margin: 30,
        width: 200,
        justifyContent: "space-between",
        alignSelf: "stretch"
    },
    picker: {
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "center",
        color: "#000"
    },
    pickerContainer: {
        backgroundColor: "#fff"
    },  
    risk: {
        color: "#fff",
        fontSize: 16
    },
    onlineStatus: {
        fontSize: 20
    },
    pointRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
