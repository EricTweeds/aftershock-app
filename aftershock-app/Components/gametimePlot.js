import React, { Component } from "react";
import Svg from 'react-native-svg';
import { StyleSheet, View } from "react-native";
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

export default class GametimePlot extends Component {

    handleDataClick(a) {
        console.log("hello", a);
    }

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <VictoryChart
                    width={700}
                    theme={VictoryTheme.material}
                    domainPadding={{x: [20, 0]}}
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
    padding: 50
  }
});