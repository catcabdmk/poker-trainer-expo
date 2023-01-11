import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/trainer/trainerSlice'


export const store = configureStore({
    reducer: {
        player: playerReducer
    },
})