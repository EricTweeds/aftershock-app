import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from "react-native-elements";
 
export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { battery } = this.props;
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
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {/*<Icon name={batteryIcon} type="font-awesome" color={batteryColor} />*/}
                    <Icon name="circle" type="font-awesome" color={this.props.device_active ? '#00bb00' : '#ff0000'} size={20} />
                </View>
                <Text style={styles.number}>{this.props.jersey_number}</Text>
                <Text style={styles.name}>{this.props.first_name[0] + ". " + this.props.last_name}</Text>
                <View style={styles.line} />
                <View style={styles.dataContainer}>
                    <Text style={styles.status}>Risk:</Text>
                    <Text style={styles.status}>{this.props.at_risk_percentage}%</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.max}>Max Impact:</Text>
                    <Text style={styles.max}>{this.props.largest_impact ? this.props.largest_impact + "g" : "--"}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    padding: 20,
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 1,
    margin: 20,
    width: 200,
    maxHeight: 270.5
  },
  dataContainer: {
    flexDirection: "row",
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
