import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryVoronoiContainer } from "victory-native";

export default class GametimePlot extends Component {
    render() {
        let { data, selected } = this.props;
        data = data.map(point => {
            let color = "#64a338";
            if (point.acceleration > 10 || point.rotational > 10) {
                color = "#e03b24";
            } else if ( point.acceleration > 5 || point.rotational > 5) {
                color = "#ffcc00";
            }
            if (selected && point.time === selected.time) {
                color = "#87a2c7";
            }
            return {
                ...point,
                fill: color
            }
        });
        return (
            <View style={styles.container}>
                <VictoryChart
                    width={700}
                    theme={VictoryTheme.material}
                    domainPadding={{x: [20, 0]}}
                    containerComponent={<VictoryVoronoiContainer 
                        onActivated={(point) => this.props.handleTouch(point)}
                    />}
                >
                    <VictoryAxis 
                        crossAxis 
                        label="Time (Minutes)"
                        style={{
                            axisLabel: {padding: 30, fontSize: 16}
                        }}
                    />
                    <VictoryAxis 
                        dependentAxis 
                        label="Acceleration (g's)"
                        style={{
                            axisLabel: {padding: 30, fontSize: 16}
                        }}
                    />
                    <VictoryScatter
                        data={data}
                        x="time"
                        y="acceleration"
                        bubbleProperty="rotational"
                        minBubbleSize={1}
                        maxBubbleSize={20}
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
    padding: 15
  }
});