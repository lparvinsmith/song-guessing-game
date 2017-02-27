import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SongData from "./SongData"
import RNFS from 'react-native-fs';
import GuessInput from "./GuessInput"
import PlayHint from './PlayHint';

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
      playAudio: false,
      guess: '',
      guessCorrect: undefined,
    };
    this.downloadSong = this.downloadSong.bind(this);
    this.onChangeGuess = this.onChangeGuess.bind(this);
    this.onGuess = this.onGuess.bind(this);
    this.onDone = this.onDone.bind(this);
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
          fromUrl: s.previewUrl,
          toFile: `${audioPath}/${audioFile}`
        }).promise;
      })
      .then((d) => this.setState({playAudio: true}))
      .catch((err) => {
        console.warn("Download error: ", err);
      })
  }

  verifyGuess(guess) {
    const guesses = guess.trim().toLowerCase().split(/\s+/);
    const answers = `${this.state.song.artist} ${this.state.song.trackName}`
                        .trim().toLowerCase();
    return guesses.reduce(function(acc, g) {
      if (answers.indexOf(g) >= 0) {
        return true;
      }
      return acc;
    }, false);
  }

  onChangeGuess(guess) {
    this.setState({guess});
  }

  onGuess() {
    guess = this.state.guess
    if (this.verifyGuess(guess)) {
      console.warn("hooray", guess);
    }
    else {
      console.warn("boo", guess);
    }
  }

  onDone() {
    console.warn("song done");
  }

  renderPlayHint() {
    if(this.state.playAudio){
      return (
        <PlayHint
          audioFile={audioFile}
          audioPath={audioPath}
          onSongDone={this.onDone}
        />
      )
    }
  }

  render() {
    const {artistName, trackName, collectionName, previewUrl} = this.state.song;
    return (
      <View style={styles.container}>
        <GuessInput
          style={styles.guessInput}
          onChangeGuess={this.onChangeGuess}
          onGuess={this.onGuess}
          guess={this.state.guess}
        />
        {this.renderPlayHint()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 200,
  },
  flashMessage: {
    flex: 0.4,
    justifyContent: 'center'
  },
  flashMessageText: {
    color: "red",
    fontSize: 30,
  },
  guessInput: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
