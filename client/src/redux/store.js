import { configureStore } from "@reduxjs/toolkit";
import { loaderReducer, userReducer } from ".";

const store = configureStore({ reducer: { loaderReducer, userReducer } });

export default store;
