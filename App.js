import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, ListView, PixelRatio, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Sudoku from 'sudoku';
import _ from 'lodash';
export default class App extends React.Component {

  constructor() {
    super();
     //const data = Array.apply(null, {length: 100}).map(Number.call, Number);
     this.state = {
       puzzle: Sudoku.makepuzzle()
     };
     this._newGame = this._newGame.bind(this)
     this._solvePuzzle = this._solvePuzzle.bind(this)
   }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  _onInput(key, input, puzzle) {
    var solved = Sudoku.solvepuzzle(_.flatten(this.state.puzzle));
    var gridpoint = key.split('-');
    var x = gridpoint[0];
    var y = gridpoint[1];
    puzzle[x][y] = parseInt(--input);

    // if(Sudoku.boardmatches(_.flatten(puzzle), solved)){
    //   Alert.alert('Game Solved');
    // }
  }

  _newGame() {
    this.setState({puzzle: Sudoku.makepuzzle()});
  }

  _solvePuzzle() {
    var solved = Sudoku.solvepuzzle(_.flatten(this.state.puzzle));
    this.setState({puzzle: solved});
  }

  generateBoard() {
    var rows = [];
    var blocks = [];
    var puzzle = _.chunk(this.state.puzzle, 9);

    puzzle.map((row) => {
      var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

      row.map((block) => {
        var key = rows.length + '-' + blocks.length;
        var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

        if(block === null) {
          blocks.push(
            <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <TextInput
                clearTextOnFocus={true}
                keyboardType={'number-pad'}
                style={styles.textInput}
                onChangeText={(input) => this._onInput(key, input, puzzle)}
              />
            </View>
          );
        } else {
          blocks.push(
            <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
              <Text style={styles.blockText}>{++block}</Text>
            </View>
          );
        }
      });
      rows.push(<View key={rows.length} style={[styles.row, rowSeperator && styles.rowSeperator]}>{blocks}</View>);
      blocks = [];
    });
    return (<View key={rows.length} style={styles.container}>{rows}</View>);
  }

  render() {
    return (
        <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this._solvePuzzle}><Text>Solve Puzzle</Text></TouchableOpacity>
          <Text style={styles.headerText}>Sudoku</Text>
          <TouchableOpacity onPress={this._newGame}><Text>New Game</Text></TouchableOpacity>
        </View>
        <View style={styles.container}>
          {this.generateBoard()}
        </View>
</View>

    );
  }
}

const styles = StyleSheet.create({

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 25,
  marginBottom: 10,
  paddingLeft: 25,
  paddingRight: 25,
},
headerText:{
  textAlign: 'center',
  fontSize: 20,
},
container: {
  alignSelf: 'center',
  width:320,
  height: 320,
  borderWidth: 3,
  borderTopWidth: 2,
  borderBottomWidth: 2
},
row: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},
rowSeperator: {
  borderBottomWidth: 3
},
textInput: {
  paddingBottom: 2,
  paddingLeft: 10,
  height: 40,
  fontSize: 25,
  backgroundColor: 'rgba(0, 0, 255, .1)'
},
block: {
  flex: 1,
  justifyContent: 'flex-start',
  borderWidth: 1,
  height:40,
},
blockSeperator: {
  borderRightWidth: 2
},
blockText: {
  fontSize: 25,
  paddingTop: 4,
  alignSelf: 'center'
}

})
