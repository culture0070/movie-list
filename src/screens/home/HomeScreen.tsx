import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPopularMoviesQuery } from '../../api/tmdbApi';
import MovieCard from '../../components/card/MovieCard';
import EmptyState from '../../components/common/EmptyState';

const HomeScreen = () => {
    const { data, isLoading, error } = useGetPopularMoviesQuery();
    const [search, setSearch] = useState('');

    interface Movie {
        id: number;
        title: string;
        // Add other movie properties as needed
    }

    interface MoviesResponse {
        results?: Movie[];
        // Add other response properties as needed
    }

    const filteredMovies: Movie[] | undefined = data?.results?.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <ActivityIndicator style={styles.loader} size="large" />;
    if (error) return <EmptyState message="Failed to fetch movies." />;

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search movies..."
                value={search}
                onChangeText={setSearch}
            />

            {filteredMovies?.length === 0 ? (
                <EmptyState message="No movies found." />
            ) : (
                <FlatList
                    data={filteredMovies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        padding: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    searchInput: {
        height: 40,
        margin: 16,
        paddingHorizontal: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
});
