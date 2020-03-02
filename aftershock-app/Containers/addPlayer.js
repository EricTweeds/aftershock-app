import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';

import Header from '../Components/header';
import { postPlayerData } from '../reducer';

const initialState = {};

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = initialState;
    }

    handleTextChange(val, key) {
        this.setState({[key]: val});
    }

    handleSubmit() {
        if (this.validate(this.state)) {
            this.props.postPlayerData(this.state, this.props.token);
            this.props.navigation.navigate('Players');
        } else {
            this.setState({error: "Please Enter Valid Information"});
        }
    }

    validate(data) {
        if (!data.first_name || data.first_name === "") {
            return false;
        } else if (!data.last_name || data.last_name === "") {
            return false;
        } else if (!data.height || data.height === "") {
            return false;
        } else if (!data.weight || data.weight === "") {
            return false;
        } else if (!data.jersey_number || data.jersey_number === "") {
            return false;
        } else if (!data.device_id || data.device_id === "") {
            return false;
        }
        return true;
    }
    render() {
        return (
            <View>
                <Header title="Add New Player" navigation={this.props.navigation} showMenu={false}/>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.doubleRow}>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>First Name</Text>
                            <Input
                                placeholder='First Name'
                                onChangeText={(val) => this.handleTextChange(val, 'first_name')}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                value={this.state.first_name}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Last Name</Text>
                            <Input
                                placeholder='Last Name'
                                onChangeText={(val) => this.handleTextChange(val, 'last_name')}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                value={this.state.last_name}
                            />
                        </View>
                    </View>
                    <View style={styles.doubleRow}>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Height (cm)</Text>
                            <Input
                                placeholder='Height (cm)'
                                onChangeText={(val) => this.handleTextChange(val, 'height')}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                keyboardType="number-pad"
                                value={this.state.height}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Weight (lbs)</Text>
                            <Input
                                placeholder='Weight (lbs)'
                                onChangeText={(val) => this.handleTextChange(val, 'weight')}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                keyboardType="number-pad"
                                value={this.state.width}
                            />
                        </View>
                    </View>
                    <View style={styles.doubleRow}>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Jersey Number</Text>
                            <Input
                                placeholder='Jersey Number'
                                onChangeText={(val) => this.handleTextChange(val, 'jersey_number')} 
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                keyboardType="number-pad"
                                value={this.state.jersey_number}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.label}>Device Id</Text>
                            <Input
                                placeholder='Device Id'
                                onChangeText={(val) => this.handleTextChange(val, 'device_id')}
                                inputContainerStyle={styles.textInputBox}
                                inputStyle={styles.textInput}
                                value={this.state.device_id}
                            />
                        </View>
                    </View>
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
                    <View style={styles.buttonRow}>
                        <Button title="Submit" onPress={this.handleSubmit}/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return { token: state.token };
};

const mapDispatchtToProps = {
    postPlayerData
}

export default connect(mapStateToProps, mapDispatchtToProps)(AddPlayer);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#e3f2fd',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: "wrap",
    padding: 20,
    width: '100%',
    height: "100%"
  },
  doubleRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  formRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5
  },
  buttonRow: {
    margin: 15
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    padding: 3
  },
  textInput: {
      width: 300
  },
  textInputBox: {
      width: 300,
      borderWidth: 1,
      padding: 5,
      backgroundColor: "#FFF"
  },
  errorMessage: {
      color: "#e03b24",
      marginLeft: 10
  }
});