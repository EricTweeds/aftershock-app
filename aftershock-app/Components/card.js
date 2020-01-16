import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull, faCircle } from "@fortawesome/free-solid-svg-icons";

 
export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { battery } = this.props;
        let batteryIcon = faBatteryEmpty;
        let batteryColor = '#ff0000';
        if (battery > 0 && battery <= 25) {
            batteryIcon = faBatteryQuarter;
        } else if (battery > 25 && battery <= 50) {
            batteryIcon = faBatteryHalf;
            batteryColor = 'orange';
        } else if (battery > 50 && battery <= 75) {
            batteryIcon = faBatteryThreeQuarters;
            batteryColor = 'black';
        } else if (battery > 75) {
            batteryIcon = faBatteryFull;
            batteryColor = 'black';
        }

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <FontAwesomeIcon icon={batteryIcon} color={batteryColor} />
                    <FontAwesomeIcon icon={faCircle} color={this.props.active ? '#00bb00' : '#ff0000'} size={20} />
                </View>
                <Text style={styles.number}>{this.props.number}</Text>
                <Text style={styles.name}>{this.props.name}</Text>
                <View style={styles.line} />
                <View style={styles.dataContainer}>
                    <Text style={styles.status}>Status:</Text>
                    <Text style={styles.status}>{this.props.status}</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.max}>Max Impact:</Text>
                    <Text style={styles.max}>{this.props.max ? this.props.max + "g" : "--"}</Text>
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
    width: 200
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
