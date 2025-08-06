import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/types';
import { addToFavorites, removeFromFavorites } from '../../slices/favoritesSlice';
import { RootState } from '../../store/index';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MovieCard = ({ movie }: { movie: any }) => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);

    const isFavorited = favorites.some((fav) => fav.id === movie.id);

    const toggleFavorite = () => {
        if (isFavorited) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetails', { movie })}
            style={styles.card}
        >
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                style={styles.poster}
                resizeMode="contain"
            />
            <View style={styles.info}>
                <View style={styles.topRow}>
                    <Text numberOfLines={1} style={styles.title}>
                        {movie.title}
                    </Text>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <Ionicons
                            name={isFavorited ? 'heart' : 'heart-outline'}
                            size={20}
                            color={isFavorited ? 'red' : 'gray'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.rating}><FontAwesome name="star" size={16} color="gold" /> {movie.vote_average}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MovieCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        overflow: 'hidden',
    },
    poster: {
        width: 100,
        height: 150,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        paddingRight: 8,
    },
    rating: {
        fontSize: 14,
        color: '#888',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
