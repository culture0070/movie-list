import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MovieCard from '../../components/card/MovieCard';
import EmptyState from '../../components/common/EmptyState';
import { RootState } from '../../store';


const FavoritesScreen = () => {
    const favorites = useSelector((state: RootState) => state.favorites);

    return (
        <SafeAreaView style={styles.container}>
            {favorites.length === 0 ? (
                <EmptyState message="No favorite movies yet." />
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    list: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#888',
    },
});
