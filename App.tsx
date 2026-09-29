import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
  Switch,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, { Movie } from './components/MovieCard';

const API_URL =
  'https://6abb5968b2118ed7abb84e88.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const numColumns = isTile ? 2 : 1;

  const fetchMovies = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // CÂU 6a: Xử lý kéo xuống để làm mới danh sách
  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleSelectMovie = (movie: Movie) => {
    if (Platform.OS === 'web') {
      alert(`Thông báo: ${movie.title}`);
    } else {
      Alert.alert('Thông báo', movie.title);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>

            <Switch
              value={isTile}
              onValueChange={(value) => setIsTile(value)}
              trackColor={{
                false: '#ccc',
                true: '#81b0ff',
              }}
              thumbColor={isTile ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        ) : (
          <FlatList
            data={movies}

            // CÂU 5c: key thay đổi theo số cột
            key={String(numColumns)}

            numColumns={numColumns}

            keyExtractor={(item) => String(item.id)}

            // CÂU 5d: tạo khoảng cách giữa 2 cột
            columnWrapperStyle={
              isTile ? styles.columnWrapper : undefined
            }

            // CÂU 6a: Pull to refresh
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }

            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isTile ? 'tile' : 'row'}
                onSelect={() => handleSelectMovie(item)}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },
});
