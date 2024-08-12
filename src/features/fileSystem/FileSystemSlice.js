
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const FileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState: {
    name: 'root',
    children: {},
    files: [],
  },
  reducers: {
    addFile: (state, action) => {
      state.files.push({
        name: action.payload.name,
        content: action.payload.content,
        type: action.payload.type,
      });
    },
    updateFile: (state, action) => {
      const { file, newName } = action.payload;
      state.files = state.files.map((f) =>
        f.name === file.name
          ? { ...f, name: newName }
          : f
      );
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((f) => f.name !== action.payload.name);
    },
    openFile: (state, action) => {
      const file = state.files.find((f) => f.name === action.payload.name);
      if (file) {
        const blob = new Blob([file.content], { type: file.type });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, FileSystemSlice.reducer);

export const { addFile, updateFile, deleteFile, openFile } = FileSystemSlice.actions;

export default persistedReducer;
