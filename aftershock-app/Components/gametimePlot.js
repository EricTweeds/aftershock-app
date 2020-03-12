import React, { Component } from "react";
import moment from 'moment';
import { StyleSheet, View } from "react-native";
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryVoronoiContainer, VictoryLabel } from "victory-native";

export default class GametimePlot extends Component {
    render() {
        let { data, selected } = this.props;
        data = data.map(point => {
            let momentTime = moment(point.timestamp, "ddd, DD MMM YYYY HH:mm:ss:SSSSSS").valueOf();

            let color = "#64a338";
            if (point.linear_risk > 60 || point.rotational_risk > 60) {
                color = "#e03b24";
            } else if (point.linear_risk > 40 || point.rotational_risk > 40) {
                color = "#ffcc00";
            }
            if (selected && momentTime === selected.time) {
                color = "#000";
            }
            return {
                time: momentTime,
                acceleration: point.linear_acceleration_magnitude,
                rotational: point.rotational_acceleration,
                linearRisk: point.linear_risk,
                rotationalRisk: point.rotational_risk,
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
                        label="Time"
                        style={{
                            axisLabel: {padding: 30, fontSize: 16}
                        }}
                        fixLabelOverlap={true}
                        tickFormat={(t) => moment(t).utcOffset(-8).format("H:mm:ss")}
                    />
                    <VictoryAxis 
                        dependentAxis 
                        label={this.props.isRotational ? "Rotational Acceleration" : "Linear Acceleration (g's)"}
                        axisLabelComponent={<VictoryLabel dy={-40} style={{height: 30}} />}
                        style={{
                            axisLabel: {padding: 0, fontSize: 16}
                        }}
                    />
                    <VictoryScatter
                        data={data}
                        x="time"
                        y={this.props.isRotational ? "rotational" :"acceleration"}
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