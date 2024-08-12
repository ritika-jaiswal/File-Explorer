import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import fileSystemReducer from "./features/fileSystem/FileSystemSlice";

const rootReducer = combineReducers({
    fileSystem : fileSystemReducer,
});

export const store = configureStore({
    reducer : rootReducer,
});

export const persistor = persistStore(store);
