import { createSlice } from "@reduxjs/toolkit";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        added: {
            meaning: [],
            synonyms: [],
        },
        removed: {
            meaning: [],
            synonyms: [],
        },
        edited: {
            meaning: [],
        },
    },
    reducers: {
        addMeaning: (state, action) => {
            state.added.meaning.push(action.payload);
        },
    },
});

export const { addMeaning } = saveSlice.actions;
export default saveSlice.reducer;
