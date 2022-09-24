import { configureStore } from "@reduxjs/toolkit";
import MainReducer from "./reducers.js";

const store = configureStore({ reducer: MainReducer });
export default store;