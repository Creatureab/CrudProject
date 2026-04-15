import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/index.js';

// Async thunks for API calls
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await api.getPosts();
    return data;
});

export const createPostAsync = createAsyncThunk('posts/createPost', async (post) => {
    const { data } = await api.createPost(post);
    return data;
});

export const updatePostAsync = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
    const { data } = await api.updatePost(id, post);
    return data;
});

export const deletePostAsync = createAsyncThunk('posts/deletePost', async (id) => {
    await api.deletePost(id);
    return id;
});

export const likePostAsync = createAsyncThunk('posts/likePost', async (id) => {
    const { data } = await api.likePost(id);
    return data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(updatePostAsync.fulfilled, (state, action) => {
                const index = state.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                return state.filter((post) => post._id !== action.payload);
            })
            .addCase(likePostAsync.fulfilled, (state, action) => {
                const index = state.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            });
    },
});

export default postsSlice.reducer;
