import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ title, data, isLoading, isWeb }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  // Adjust the number of columns for web
  const numColumns = isWeb ? 4 : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal={!isWeb} // Horizontal scroll for mobile, vertical for web
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
          >
            <View style={[styles.movieItem, isWeb && styles.movieItemWeb]}>
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://via.placeholder.com/150',
                }}
                style={[styles.poster, isWeb && styles.posterWeb]}
                onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={!isWeb}
        numColumns={isWeb ? numColumns : undefined} // Use numColumns for web
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
    color: '#fff',
  },
  movieItem: {
    marginRight: 16,
    width: 150,
  },
  movieItemWeb: {
    width: '23%', // Adjust width for web
    margin: 10,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  posterWeb: {
    width: '100%', // Full width for web
    height: 300, // Adjust height for web
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
});

export default MovieList;