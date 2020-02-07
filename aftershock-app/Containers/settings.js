import React, { Component } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import Header from "../Components/header";
import pushNotificationTool from "../Tools/pushNotificationTool";
import { retrieveItem, setItem } from '../Tools/asyncStorageTool';

export default class Settings extends Component {
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
    }

    handleNotificationChange(val) {
        this.setState({enable_notifications: val});
        if (val) {
            this.getToken();
        }
        setItem('allowNotifications', val.toString());
    }

    async getToken() {
        await pushNotificationTool();
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
                </View>
            </View>
        )
    }
}

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
    }
  });