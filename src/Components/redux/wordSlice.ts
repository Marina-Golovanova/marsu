import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IColKey, IWord } from "../types";
import { getNewWord } from "../../utils/getNewWord";

const initialState: IWord[] = [];

export const addNewWord = createAsyncThunk(
  "words/addNewWord",
  async (word: string) => {
    const response = await getNewWord(word);
    return response;
  }
);

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async (data: { prev: string; new: string }) => {
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
      action: { payload: { key: string; col: IColKey; value: string } }
    ) => {
      console.log(action.payload);
      const newValue =
        action.payload.col === "translationes"
          ? [action.payload.value]
          : action.payload.value;
      return state.map((word) =>
        word.key === action.payload.key
          ? { ...word, [action.payload.col]: newValue }
          : word
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewWord.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        return state.map((word) =>
          word.key === action.payload.data.prev ? action.payload.response : word
        );
      });
  },
});

export const selectWords = (state: RootState) => state.words;
