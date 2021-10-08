
import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from "./reduxModules/favoriteSlice"
import { persistStore } from 'redux-persist';

export const store = configureStore({
    
    reducer: {
        favorites: favoriteReducer
    }

}
);
export const persistor = persistStore(store);
