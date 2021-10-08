import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    withList: ["favorites"]
}

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        value: [],
    },
    reducers: {
        addMusic: (state, music) => ({
            ...state,
            value: [...state.value, music.payload]

            // if(!music.isfavorite) {
               
            //     state.value = [...state.value, music];
            // } else {
            //     return state.value
            // }
        }),
        removeMusic: (state, action) =>  {
            console.log(action.payload);
            return ({
                ...state,
                value: state.value.filter(value => value.id !== action.payload.id)
            })
        },
        saveList: (state, action) => {
            state.value += action.payload
        }

    }
});

export const {addMusic, removeMusic, saveList} = favoriteSlice.actions;

export default persistReducer(persistConfig, favoriteSlice.reducer);