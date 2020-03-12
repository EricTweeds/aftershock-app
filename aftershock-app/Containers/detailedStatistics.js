import React, { Component } from "react";
import { View } from "react-native";
import { connect } from 'react-redux';


class DetailedStatistics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return { 

    }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedStatistics);


const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});