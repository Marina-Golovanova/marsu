import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IColKey, IWord } from "../types";
import { getNewWord } from "../../utils/getNewWord";

// const initialState: IWord[] = [];
// const initialState: Record<string, IWord[]> = {};
type ICategory = {
  name: string;
  words: IWord[];
};

const initialState: ICategory[] = [];

export const addNewWord = createAsyncThunk(
  "words/addNewWord",
  async (data: { word: string; category: string }) => {
    const response = await getNewWord(data.word);
    return { data, response };
  }
);

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async (data: { prev: string; new: string; category: string }) => {
    const response = await getNewWord(data.new);
    return { data, response };
  }
);

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    updateWordInfo: (
      state,
      action: {
        payload: { key: string; col: IColKey; value: string; category: string };
      }
    ) => {
      const category = action.payload.category;
      const newValue =
        action.payload.col === "translations"
          ? [action.payload.value]
          : action.payload.value;
      return state.map((cat) =>
        cat.name === category
          ? {
              ...cat,
              words: cat.words.map((word) =>
                word.key === action.payload.key
                  ? { ...word, [action.payload.col]: newValue }
                  : word
              ),
            }
          : cat
      );
    },
    addCategory: (state, action: { payload: string }) => {
      return state.concat({ name: action.payload, words: [] });
    },
    updateCategoryName: (
      state,
      action: { payload: { prev: string; new: string } }
    ) => {
      const prevName = action.payload.prev;
      const newName = action.payload.new;
      return state.map((cat) =>
        cat.name === prevName ? { ...cat, name: newName } : cat
      );
    },
    deleteCategory: (state, action: { payload: string }) => {
      return state.filter((cat) => cat.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewWord.fulfilled, (state, action) => {
        const category = action.payload.data.category;
        return state.map((cat) =>
          cat.name === category
            ? { ...cat, words: cat.words.concat(action.payload.response) }
            : cat
        );
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        const category = action.payload.data.category;
        return state.map((cat) =>
          cat.name === category
            ? {
                ...cat,
                words: cat.words.map((word) =>
                  word.key === action.payload.data.prev
                    ? action.payload.response
                    : word
                ),
              }
            : cat
        );
      });
  },
});

export const selectCategories = (state: RootState) => state.words;
