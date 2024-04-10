import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videoSearch: [],
};

const videoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getVideos: (state, action) => {
            const videos = action.payload;
            state.videoSearch = [...videos];
        },
        clearVideos: (state, action) => {
            state.videoSearch = [];
        },
    },
});

export const { getVideos, clearVideos } = videoSlice.actions;

export default videoSlice.reducer;
