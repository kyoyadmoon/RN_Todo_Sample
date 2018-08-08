import React, { Component } from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  input: {
    backgroundColor: '#fff',
    height: 40,
    padding: 8,
    marginBottom: 20,
    fontSize: 22,
    borderBottomWidth: 1,
    borderColor: '#DDD'
  }
});

export default class SignIn extends Component {
  state = {
    username: null
  };

  onChangeText = text => {
    this.setState({ username: text });
    console.log('text', text);
  };

  signIn = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Username" value={this.state.username} style={styles.input} onChangeText={this.onChangeText} />
        <Button
          onPress={this.signIn}
          title="登入"
          color="blue"
        />
      </View>
    );
  }
}
