import React, { Component } from 'react'
import {Text} from 'react-native'

export default class RandomColor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red'
    };
    setInterval(() => {
      const colors = ['red', 'green', 'blue', 'yellow', 'indigo'];
      const color = colors[Math.floor(Math.random()*colors.length)];
      this.setState({color});
    }, 2000);
  }

  render() {
    return <Text style={{color: this.state.color}}>Text Changes Colors</Text>
  }
}
