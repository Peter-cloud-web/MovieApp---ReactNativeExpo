import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const MovieList = ({ title, data, onPressMovie, loadMore, isLoading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressMovie(item)}>
            <View style={styles.movieItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadMore} // Trigger pagination
        onEndReachedThreshold={0.5} // Load more when 50% of the list is scrolled
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  movieItem: {
    marginRight: 16,
    width: 150,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MovieList;