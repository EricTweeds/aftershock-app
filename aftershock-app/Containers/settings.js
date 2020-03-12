import React, { Component } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import Header from "../Components/header";
import pushNotificationTool from "../Tools/pushNotificationTool";
import { retrieveItem, setItem } from '../Tools/asyncStorageTool';

import { postNotificationToken, postNotificationDelete, storeNumDataPoints, storeRefreshRate } from '../reducer';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleNotificationChange = this.handleNotificationChange.bind(this);
    }
    state = {
    }

    componentWillMount() {
        retrieveItem('allowNotifications').then((notifications) => {
            const val = notifications === "true";
            this.setState({enable_notifications: val});
        });
        retrieveItem('numDataPoints').then((numDataPoints) => {
            this.setState({dataPoints: numDataPoints});
        });
        retrieveItem('refreshRate').then((refreshRate) => {
            this.setState({refreshRate: refreshRate});
        });
    }

    handleNotificationChange(val) {
        this.setState({enable_notifications: val});
        if (val) {
            this.getToken().then(response => {
                this.props.postNotificationToken(response, this.props.token);
            });
        } else {
            this.props.postNotificationDelete(this.props.token);
        }
        setItem('allowNotifications', val.toString());
    }

    handleNumPointsChange(val) {
        this.setState({dataPoints: val});
        this.props.storeNumDataPoints(val);
        setItem('numDataPoints', val.toString());
    }

    handleRefreshRateChange(val) {
        this.setState({refreshRate: val});
        this.props.storeRefreshRate(val);
        setItem('refreshRate', val.toString());
    }

    async getToken() {
        let token = await pushNotificationTool();
        return token;
    }

    render() {
        return (
            <View>
                <Header title="Settings" navigation={this.props.navigation} showMenu={false}/>
                <View style={styles.container}>
                    <Text style={styles.sectionHeader}>Notifications</Text>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingName}>Enable Notifications</Text>
                        <Switch 
                            onValueChange={this.handleNotificationChange}
                            value={this.state.enable_notifications}
                            trackColor={{true: "#3b5998"}}
                            thumbColor="#8b9dc3"
                        />
                    </View>
                    <Text style={styles.sectionHeader}>Display Options</Text>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingName}>Number of Data Points:</Text>
                        <Input
                                placeholder='500'
                                onChangeText={(val) => this.handleNumPointsChange(val)}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                keyboardType="number-pad"
                                value={this.state.dataPoints}
                        />
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingName}>Data Refresh Rate (s):</Text>
                        <Input
                                placeholder='10'
                                onChangeText={(val) => this.handleRefreshRateChange(val)}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                keyboardType="number-pad"
                                value={this.state.refreshRate}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.token };
}

const mapDispatchToProps = {
    postNotificationToken,
    postNotificationDelete,
    storeNumDataPoints,
    storeRefreshRate
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      backgroundColor: '#e3f2fd',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexWrap: "wrap",
      padding: 20,
      height: "100%"
    },
    sectionHeader: {
        fontSize: 24
    },
    text: {
      fontSize: 32,
      color: "#fff"
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 10
    },
    settingName: {
        marginRight: 10
    },
    textInput: {
        width: 300
    },
    textInputBox: {
        width: 300,
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: "#FFF"
    },
  });