import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Picker, Switch } from "react-native";
import { connect } from 'react-redux';
import moment from 'moment';

import { getPlayerData, postNotificationSend, getGameStarts, getGameData } from "../reducer";

import { formatMonthDay } from '../Tools/dateTools';

import Header from "../Components/header";
import GametimePlot from "../Components/gametimePlot";

class PlayerDetails extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handlePointTouch = this.handlePointTouch.bind(this);
        this.handlePickerChange = this.handlePickerChange.bind(this);
        this.loadGameData = this.loadGameData.bind(this);
        this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    }

    state = { game: 0};

    componentDidMount() {
        const { player_id } = this.props.navigation.state.params;
        this.props.getPlayerData(player_id, this.props.token);
        this.props.getGameStarts(player_id, this.props.token);
        this.setState({id: player_id});
        let refreshRate = this.props.refreshRate ? this.props.refreshRate : 5;
        console.log(refreshRate, this.props.numDataPoints);
        let intervalId = setInterval(this.loadGameData, refreshRate*1000);
        this.setState({intervalId});
    }

    async loadGameData() {
        try {
            this.props.getGameData(this.state.id, this.state.game, this.props.token, this.props.numDataPoints);
        } catch (e) {
            console.log(e);
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    
    handleBack() {
        clearInterval(this.state.intervalId);
        this.props.navigation.navigate('Players');
    }

    handlePointTouch(data) {
        if (data.length) {
            this.setState({selected: data[0]});
        }
    }

    handlePickerChange(itemValue) {
        if (itemValue !== undefined) {
            this.props.getGameData(this.state.id, itemValue, this.props.token);
            this.setState({game: itemValue});
        }
    }

    handleDataTypeChange(value) {
        this.setState({isRotational: value});
    }

    sendNotification() {
        this.props.postNotificationSend("Injury Reported", this.props.token);
    }

    render() {
        let player = this.props.playerDetails && this.props.playerDetails[this.state.id] ? this.props.playerDetails[this.state.id] : {};
        let games = this.props.gameStarts && this.props.gameStarts[this.state.id] ? this.props.gameStarts[this.state.id] : [];
        let gameData = this.props.gameData ? this.props.gameData.data : [];
        let riskColor;
        let riskText = "unknown";

        if (player.at_risk_percentage < 40) {
            riskColor = "#64a338";
            riskText = "Good";
        } else if (player.at_risk_percentage >= 40 && player.at_risk_percentage < 60) {
            riskColor = "#ffcc00";
            riskText = "Warning";
        } else {
            riskColor = "#e03b24";
            riskText = "Danger"
        }
        let name = player.first_name && player.last_name ? player.first_name + " " + player.last_name : "";
        return (
            <View style={styles.container}>
                <Header title={name} navigation={this.props.navigation} showMenu={true}/>
                <View style={styles.details}>
                    <View style={styles.statusRow}>
                        <Button title="Back to Team" onPress={() => this.handleBack()} />
                        <Button title="Report Injury" onPress={() => this.sendNotification()} disabled/>
                        {/* <Icon name="circle" type="font-awesome" color={active ? '#00bb00' : '#ff0000'} size={20} />
                        <Icon name={batteryIcon} type="font-awesome" color={batteryColor} /> */}
                    </View>
                    <View style={styles.detailsRow}>
                        <View style={styles.picColumn}>
                            <View style={{...styles.pic, backgroundColor: riskColor}}>
                                <Text style={styles.number}>{player.at_risk_percentage}%</Text>
                                <Text style={styles.risk}>{riskText}</Text>
                            </View>
                            <Text style={{...styles.onlineStatus, color: player.device_active ? "#64a338" : '#e03b24'}}>{player.device_active ? "Online" : "Offline"}</Text>
                            {/* <View style={{...styles.status, backgroundColor: "#00bb00"}}>
                                <Text style={styles.statusText}>{status}</Text>
                            </View> */}
                        </View>
                        <View style={styles.dataColumn}>
                            <View style={styles.infoRow}><Text style={styles.info}>Team: </Text><Text style={styles.info}>Waterloo Warriors</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Position: </Text><Text style={styles.info}>{player.position}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Height: </Text><Text style={styles.info}>{player.height_cm} cm</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Weight: </Text><Text style={styles.info}>{player.weight_kg} lbs</Text></View>
                        </View>
                        <View style={styles.dataColumn}>
                            <View style={styles.infoRow}><Text style={styles.info}>Age: </Text><Text style={styles.info}>{player.age}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.info}>Largest Impact: </Text><Text style={styles.info}>{player.largest_impact ? player.largest_impact.toPrecision(3): ""}g</Text></View>
                            <View style={styles.infoRow}>
                                <Text style={styles.info}>Largest Rotational Impact: </Text>
                                <View style={styles.rotationalRow}>
                                    <Text style={styles.info}>{player.largest_rotation ? player.largest_rotation.toPrecision(4) : ""} rad/s</Text>
                                    <Text style={{lineHeight: 10, fontSize: 10}}>2</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}><Text style={styles.info}>Total Collisions: </Text><Text style={styles.info}>{player.totalCollisions}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.currentGameData}>
                    <View style={styles.plot}>
                        {gameData.length ? <GametimePlot data={gameData} handleTouch={this.handlePointTouch} selected={this.state.selected} isRotational={this.state.isRotational} /> : null}
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
                                    {games.map((game, i) => {
                                        let label = formatMonthDay(game.timestamp);
                                        return (
                                            <Picker.Item label={label} value={game.id} key={game.id}/>
                                        );
                                    })}
                                </Picker>
                            </View>
                            {this.state.selected ? <View style={styles.pointData}>
                            <View style={styles.pointRow}><Text style={styles.info}>Time: </Text><Text style={styles.info}>{moment(this.state.selected.time).utcOffset(-8).format("H:mm:ss")}</Text></View>
                            <View style={styles.pointRow}><Text style={styles.info}>Linear: </Text><Text style={styles.info}>{this.state.selected.acceleration.toPrecision(3)}g</Text></View>
                            <View style={styles.pointRow}><Text style={styles.info}>Rotational: </Text>
                                <View style={styles.rotationalRow}>
                                    <Text style={styles.info}>{this.state.selected.rotational.toPrecision(4)} rad/s</Text>
                                    <Text style={{lineHeight: 10, fontSize: 10}}>2</Text>
                                </View>
                            </View>
                            <View style={styles.pointRow}><Text style={styles.info}>Linear Risk: </Text><Text style={styles.info}>{this.state.selected.linearRisk}%</Text></View>
                            <View style={styles.pointRow}><Text style={styles.info}>Rotational Risk: </Text><Text style={styles.info}>{this.state.selected.rotationalRisk}%</Text></View>
                            </View> : null}
                            <View style={styles.toggleRow}>
                                <Text>Linear</Text>
                                <Switch 
                                    onValueChange={this.handleDataTypeChange}
                                    value={this.state.isRotational}
                                    trackColor={{true: "#3b5998"}}
                                    thumbColor="#8b9dc3"
                                />
                                <Text>Rotational</Text>
                            </View>
                    </View>
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return { 
        player: state.player,
        token: state.token,
        playerDetails: state.playerDetails,
        gameStarts: state.game_starts,
        gameData: state.gameData,
        numDataPoints: state.numDataPoints,
        refreshRate: state.refreshRate
    }
};

const mapDispatchToProps = {
    postNotificationSend,
    getPlayerData,
    getGameStarts,
    getGameData
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
    rotationalRow: {
        flexDirection: "row",
        justifyContent: "flex-end"
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
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: 'space-between'
    }
});
