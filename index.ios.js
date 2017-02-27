/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import GameContainer from "./src/GameContainer";
import RandomColor from "./src/RandomColor"

export default class SongGuessingGame extends Component {
  render() {
    return (
      <GameContainer />
    );
  }
}

AppRegistry.registerComponent('SongGuessingGame', () => SongGuessingGame);
