import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from 'react-redux';
import { Notifications } from 'expo';

import logo from "../assets/blue_logo.png";

import { retrieveItem } from '../Tools/asyncStorageTool';

import { wakeupServer, storeToken, storeNumDataPoints, storeRefreshRate } from '../reducer.js';

class StartupScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.awake) {
          this.props.wakeupServer()
        }
        retrieveItem('token').then((token) => {
          if (token !== null) {
            this.props.storeToken(token);
            this.props.navigation.navigate('Players');
          } else {
            this.props.navigation.navigate('Login');
          }
        });
        retrieveItem('numDataPoints').then((numDataPoints) => {
            this.props.storeNumDataPoints(numDataPoints);
        });
        retrieveItem('refreshRate').then((refreshRate) => {
            this.props.storeRefreshRate(refreshRate);
        });
        this._notificationSubscription = Notifications.addListener(this._handleNotifications);
    }
    
    _handleNotifications = notification => {
        if (notification.data && notification.data.player_id && notification.origin === 'selected') {
            this.props.navigation.navigate('PlayerDetails', {
                player_id: notification.data.player_id
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} />
            </View>
        );
    }
}

const mapDispatchToProps = {
    wakeupServer,
    storeToken,
    storeNumDataPoints,
    storeRefreshRate
}

export default connect(null, mapDispatchToProps)(StartupScreen);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3f2fd",
        height: "100%"
    },
    title: {
        fontSize: 40
    }
})