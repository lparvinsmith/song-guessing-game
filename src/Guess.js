import React, {Component} from 'react';
import { View, Text } from 'react-native';
import SongData from "./SongData"
import RNFS from 'react-native-fs';

const audioFile = 'audio.m4a';
const audioPath = RNFS.DocumentDirectoryPath;

export default class Guess extends Component {
  static navigationOptions = {
    title: 'Guess That Song'
  }

  constructor(props){
    super(props)
    this.state = {
      song: {},
      playAudio: false
    };
    this.downloadSong = this.downloadSong.bind(this);
  }

  componentDidMount(){
    this.downloadSong()
  }

  downloadSong(){
    const songId = SongData.randomSongId();
    fetch(`https://itunes.apple.com/us/lookup?id=${songId}`) // returns promise
      .then(d => d.json()) // gives back an object which we need to convert to json.
      .then((d) => {
        var song = d.results[0]
        this.setState({song})
        return song;  // returning the song for the next .then method
      })
      .then((s) => {
        return RNFS.downloadFile({
          fromUrl: s.audioUrl,
          toFile: `${audioPath}/${audioFile}`
        }).promise;
      })
      .then((d) => this.setState({playAudio: true}))
      .catch((err) => {
        console.warn("Download error: ", err);
      })
  }

  render() {
    const {artistName, trackName, collectionName, previewUrl} = this.state.song;
    return (
      <View>
        <Text>{trackName}</Text>
        <Text>{artistName}</Text>
        <Text>{collectionName}</Text>
      </View>
    );
  }
}
