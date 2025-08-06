import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPopularMoviesQuery } from '../../api/tmdbApi';
import MovieCard from '../../components/card/MovieCard';
import EmptyState from '../../components/common/EmptyState';
interface Movie {
    id: number;
    title: string;
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const { data, isLoading, error } = useGetPopularMoviesQuery();
    const [search, setSearch] = useState('');



    const filteredMovies: Movie[] | undefined = data?.results?.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    if (isLoading) return <ActivityIndicator style={styles.loader} size="large" />;
    if (error) return <EmptyState message="Failed to fetch movies." />;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Movies</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#ff0000ff" />
                </TouchableOpacity>
            </View>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 8,
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
