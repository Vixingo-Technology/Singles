import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
    const total_results = 50;
    const start_word = "A";
    const api = "https://api-zcg7jiz4mq-uc.a.run.app/words";
    const queryParam = "?offset=" + start_word + "&limit=" + total_results;
    const finalURL = api + queryParam;
    const response = await axios.get(finalURL);

    return response.data;
});

const wordsSlice = createSlice({
    name: "words",
    initialState: {
        wordsList: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addWord: (state, action) => {
            state.wordsList.push(action.payload);
        },
        updateWord: (state, action) => {
            const { id, newWord } = action.payload;
            const index = state.wordsList.findIndex((word) => word.id === id);
            if (index !== -1) {
                state.wordsList[index] = newWord;
            }
        },
        deleteWord: (state, action) => {
            const id = action.payload;
            state.wordsList = state.wordsList.filter((word) => word.id !== id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWords.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWords.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wordsList = action.payload;
            })
            .addCase(fetchWords.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { addWord, updateWord, deleteWord } = wordsSlice.actions;
export default wordsSlice.reducer;
