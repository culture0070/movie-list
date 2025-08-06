import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/types';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { RootState } from '../../store/index';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

const MovieDetailsScreen = () => {
    const { params } = useRoute<MovieDetailsRouteProp>();
    const { movie } = params;

    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie.id));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>⭐ {movie.vote_average} | {movie.release_date}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>

            <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color="white"
                />
                <Text style={styles.favoriteText}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    poster: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 16,
    },
    overview: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e50914',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
    },
    favoriteText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
    },
});
