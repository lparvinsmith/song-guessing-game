import React, {Component} from 'react';
import { View, Text } from 'react-native';
import SongData from "./SongData"

export default class Guess extends Component {
  constructor(props){
    super(props)
    this.state = {
      song: {},
      playAudio: false
    };
    this.onStartPlaying = this.onStartPlaying.bind(this);
  }

  componentDidMount(){
    this.downloadSong()
  }

  downloadSong(){
    const songId = SongData.randomSongId();
    fetch(`https://itunes.apple.com/us/lookup?id=${songId}`) // returns promise
      .then(d => d.json()) // gives back an object which we need to convert to json.
      .then((d) => {
        song = JSON.stringify(d.results[0])
        console.warn(song);
        return song;  // returning the song for the next .then method
      })
      .then((song) => {
        this.setState({song})
      })
  }

  onStartPlaying(){
    this.setState({startPlaying: true})
  }

  render() {
    return (
      <View>
        <Text>{this.state.song.trackName}</Text>
        <Text>{this.state.song.artistName}</Text>
        <Text>{this.state.song.collectionName}</Text>
      </View>
    );
  }
}
