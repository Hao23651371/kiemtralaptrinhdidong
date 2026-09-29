import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  layout = 'row',
  onSelect,
}) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      activeOpacity={0.7}
      onPress={() => onSelect(movie.id)}
    >
      <View style={isTile ? styles.posterWrapperTile : undefined}>
        <Image
          source={{
            uri:
              movie.poster &&
              movie.poster.startsWith('http')
                ? movie.poster
                : 'https://picsum.photos/200/300',
          }}
          style={
            isTile
              ? styles.posterTile
              : styles.posterRow
          }
          resizeMode="cover"
        />

        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              ⭐ {Number(movie.rating).toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}
        pointerEvents="none"
      >
        <Text
          style={styles.title}
          numberOfLines={isTile ? 1 : undefined}
        >
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.text}>
            {movie.genre} - {movie.year}
          </Text>
        )}

        {!isTile && (
          <Text style={styles.text}>
            ⭐ {Number(movie.rating).toFixed(1)}
          </Text>
        )}

        <Text style={styles.text}>
          {movie.isShowing
            ? '✅ Đang chiếu'
            : '❌ Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  posterRow: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#eee',
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  cardTile: {
    flexDirection: 'column',
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  posterWrapperTile: {
    width: '100%',
    position: 'relative',
  },

  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#eee',
  },

  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  ratingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  infoTile: {
    marginLeft: 0,
    padding: 8,
    width: '100%',
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  text: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
});

export default React.memo(MovieCard);
