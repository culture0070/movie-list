import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [] as any[],
    reducers: {
        addToFavorites: (state, action) => {
            state.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            return state.filter(movie => movie.id !== action.payload.id);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
