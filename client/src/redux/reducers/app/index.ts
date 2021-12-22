import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './../../store/index'

interface AppState {
    isLoading: boolean
}

const initialState: AppState = {
    isLoading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isLoading: payload,
        }),
    },
})

export const { setIsLoading } = appSlice.actions

export const selectApp = ({ app }: RootState) => app

export default appSlice.reducer
