import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    displayName: '',
    picture: '',
    role: '',
    accessToken: '',
    refreshToken: '',
    username: '',
    followingList: [],
    likeList: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, displayName, picture, accessToken, refreshToken, username, followingList, likeList, role } = action.payload;
            state.id = id;
            state.displayName = displayName;
            state.picture = picture;
            state.role = role;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.username = username;
            state.followingList = followingList;
            state.likeList = likeList;
        },
        updateCurrentUser: (state, action) => {
            const { id, displayName, picture, accessToken, refreshToken, username, followingList, likeList, role } = action.payload;
            state.id = id !== undefined ? id : state.id;
            state.displayName = displayName !== undefined ? displayName : state.displayName;
            state.picture = picture !== undefined ? picture : state.picture;
            state.role = role !== undefined ? role : state.role;
            state.accessToken = accessToken !== undefined ? accessToken : state.accessToken;
            state.refreshToken = refreshToken !== undefined ? refreshToken : state.refreshToken;
            state.username = username !== undefined ? username : state.username;
            state.followingList = followingList !== undefined ? followingList : state.followingList;
            state.likeList = likeList !== undefined ? likeList : state.likeList;
        },
        logout: (state) => {
            state.id = '';
            state.displayName = '';
            state.picture = '';
            state.role = '';
            state.accessToken = '';
            state.refreshToken = '';
            state.username = '';
            state.followingList = []
            state.likeList = [];
        },
    },
});

export const { login, logout, updateCurrentUser } = userSlice.actions;

export default userSlice.reducer;
