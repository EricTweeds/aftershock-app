import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';

import { retrieveItem } from '../Tools/asyncStorageTool';

import { wakeupServer, storeToken } from '../reducer.js';

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
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>AFTERSHOCK</Text>
            </View>
        );
    }
}

const mapDispatchToProps = {
    wakeupServer,
    storeToken
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