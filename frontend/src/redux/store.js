import { configureStore } from "@reduxjs/toolkit"

// Slice
import authReducer from "./slices/authSlice"

// redux-toolkit query
import usersServices from './services/usersServices';
import postsServices from './services/postsServices';

export const store = configureStore({
    reducer: {
        // slices
        auth: authReducer,

        // redux-toolkit query
        [usersServices.reducerPath]: usersServices.reducer,
        [postsServices.reducerPath]: postsServices.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            usersServices.middleware,
            postsServices.middleware,
        );
    },
})