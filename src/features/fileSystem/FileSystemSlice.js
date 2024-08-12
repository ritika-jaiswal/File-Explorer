import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export const FileSystemSlice = createSlice({
    name : 'fileSystem',
    initialState: {
        name: 'root',
        children : {},
        files: [],
    },
    reducers: {
        addFile: (state,action) => {
            state.files.push(action.payload);
        },
        updateFile: (state,action) => {
            const {file, newName} = action.payload;
            state.files = state.files.map((f) => 
                f.name === file.name ? new File([f], newName, {type: f.type}) : f
            );
        },

        deleteFile: (state, action) => {
            state.files = state.files.filter((f) => f.name !== action.payload.name)

        },

        openFile: (state, action) => {
            const {file} = action.payload;
            const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank')
        }
    }
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig,FileSystemSlice.reducer);

export const {addFile, updateFile, deleteFile, openFile} = FileSystemSlice.actions;

export default persistedReducer;