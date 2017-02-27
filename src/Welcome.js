import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

// similar to React.createClass
export default class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello React-Native</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
