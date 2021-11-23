import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import MusicPlayer from './component/MusicPlayer';

class App extends React.Component{
  render(){
    return (
      <View style = {StyleSheet.container}>
        <StatusBar barStyle="light-content"/>
        <MusicPlayer />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})