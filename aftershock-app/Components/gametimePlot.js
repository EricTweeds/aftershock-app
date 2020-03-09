import React, { Component } from "react";
import moment from 'moment';
import { StyleSheet, View } from "react-native";
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLabel } from "victory-native";

export default class GametimePlot extends Component {
    render() {
        let { data, selected } = this.props;
        let baseTime = moment(data[data.length - 1].timestamp, "ddd, DD MMM YYYY HH:mm:ss:SSSSSS").valueOf();
        data = data.map(point => {
            let color = "#64a338";
            if (point.linear_acceleration_magnitude > 10 || point.rotational > 10) {
                color = "#e03b24";
            } else if ( point.linear_acceleration_magnitude > 5 || point.rotational > 5) {
                color = "#ffcc00";
            }
            if (selected && point.time === selected.time) {
                color = "#87a2c7";
            }
            let momentTime = moment(point.timestamp, "ddd, DD MMM YYYY HH:mm:ss:SSSSSS");
            let time = momentTime.valueOf() - baseTime;
            return {
                time: time,
                acceleration: point.linear_acceleration_magnitude,
                rotational: point.rotational_acceleration,
                fill: color
            }
        });
        return (
            <View style={styles.container}>
                <VictoryChart
                    width={720}
                    theme={VictoryTheme.material}
                    domainPadding={{x: [20, 0]}}
                    containerComponent={<VictoryVoronoiContainer 
                        onActivated={(point) => this.props.handleTouch(point)}
                    />}
                >
                    <VictoryAxis 
                        crossAxis 
                        label="Time (Milliseconds)"
                        style={{
                            axisLabel: {padding: 30, fontSize: 16}
                        }}
                    />
                    <VictoryAxis 
                        dependentAxis 
                        label="Acceleration (g's)"
                        axisLabelComponent={<VictoryLabel dy={-40} style={{height: 30}} />}
                        style={{
                            axisLabel: {padding: 0, fontSize: 16}
                        }}
                    />
                    <VictoryScatter
                        data={data}
                        x="time"
                        y="acceleration"
                        // bubbleProperty="rotational"
                        // minBubbleSize={1}
                        // maxBubbleSize={5}
                        style={{
                            data: {
                                fill: ({ datum }) => datum.fill
                            }
                        }}
                        events={[
                            {
                                target: "data",
                                eventHandlers: {
                                    onPressIn: () => console.log("press")
                                }
                            }
                        ]}
                    />
                </VictoryChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    padding: 15,
    marginLeft: 30
  }
});