import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getTeamData } from '../reducer';

import Card from "../Components/card";
import Header from '../Components/header';

class Players extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTeamData("id");
    }

    handlePress(id) {
        this.props.navigation.navigate('PlayerDetails', {
            playerId: id
        });
    }

    render() {
        return (
            <View>
                <Header title="Players" navigation={this.props.navigation} showMenu={true}/>
                <View style={styles.container}>
                    {this.props.players ? this.props.players.map((player, i) => {
                        return (
                            <TouchableOpacity key={player.number} onPress={() => this.handlePress(player.id)}>
                                <Card {...player} key={"player-" + i}/>
                            </TouchableOpacity>
                        );
                    }) : null}
                </View>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return { players: state.players }
};

const mapDispatchToProps = {
    getTeamData
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    padding: 20
  },
  text: {
    fontSize: 32,
    color: "#fff"
  }
});
