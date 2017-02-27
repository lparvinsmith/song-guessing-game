import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import CustomButton from './CustomButton'

export default class GuessInput extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          value={this.props.guess}
          onChangeText={this.props.onChangeGuess}
          style={styles.input}/>
        <CustomButton
          onPress={this.props.onGuess}
          title="Guess!"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ededed',
    height: 50,
    width: 250,
    marginBottom: 15,
    borderRadius: 4
  }
});
