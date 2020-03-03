import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getTeamData } from '../reducer';

import Card from "../Components/card";
import Header from '../Components/header';
import AddPlayerCard from '../Components/addCard';

class Players extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.players) {
            this.props.getTeamData(this.props.token);
        }
    }

    handlePress(data) {
        if (data === 'add') {
            this.props.navigation.navigate('AddPlayer');
        } else {
            this.props.navigation.navigate('PlayerDetails', {
                player: data
            });
        }   
    }

    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Header title="Players" navigation={this.props.navigation} showMenu={true}/>
                <ScrollView contentContainerStyle={styles.container}>
                    {this.props.players ? this.props.players.map((player, i) => {
                        return (
                            <TouchableOpacity key={player.id} onPress={() => this.handlePress(player)}>
                                <Card {...player} key={"player-" + i}/>
                            </TouchableOpacity>
                        );
                    }) : null}
                    <TouchableOpacity key="add" onPress={() => this.handlePress('add')}>
                        <AddPlayerCard  />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return { players: state.players, token: state.token }
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
