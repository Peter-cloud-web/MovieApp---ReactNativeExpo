import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TopRatedMovies from './screens/TopRatedMovies';

export default function App() {
  return (
    <View style={styles.container}>
      <TopRatedMovies />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});