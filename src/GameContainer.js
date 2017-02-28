import React, { Component } from 'react';
import Welcome from "./Welcome";
import Guess from "./Guess";
import {StackNavigator} from 'react-navigation';
import Answer from "./Answer";

const AnswerNavigator = StackNavigator({
  Answer: { screen: Answer}
}, {
  initialRouteName: 'Answer'
});

const GameContainer = StackNavigator({
  Welcome: { screen: Welcome },
  Guess: { screen: Guess },
  AnswerNavigator: { screen: AnswerNavigator }
}, {
  initialRouteName: "Welcome",
  headerMode: "none"
});

export default GameContainer;
