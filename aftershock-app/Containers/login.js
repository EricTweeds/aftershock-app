import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    onSignIn(e) {
        console.log(this.state.username, this.state.password);
    }
    onUsernameChange(username) {
        this.setState({username});
    }
    onPasswordChange(password) {
        this.setState({password});
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.loginCard}>
                    <Text style={styles.login}>Login</Text>
                    <View style={styles.inputRow}>
                        <Text style={styles.caption}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            autoCompleteType="username"
                            textContentType="username"
                            onChangeText={this.onUsernameChange.bind(this)}
                        />
                    </View>
                    <View style={styles.inputRow}>
                        <Text style={styles.caption}>Password:</Text>
                        <TextInput
                            style={styles.input}
                            autoCompleteType="password"
                            textContentType="password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Button title="Register" color="#d3d3d3" />
                        <Button onPress={this.onSignIn.bind(this)} title="Sign In" />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%'
  },
  loginCard: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 3,
    padding: 50
  },
  text: {
    fontSize: 32,
    color: "#fff"
  },
  login: {
    fontSize: 80
  },
  inputRow: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  caption: {
    marginRight: 10
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    width: 150
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignSelf: "stretch",
    padding: 10
  }
});
