import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice";
import saveSlice from "./saveSlice";

const store = configureStore({
    reducer: {
        words: wordsReducer,
        save: saveSlice,
    },
});

export default store;
