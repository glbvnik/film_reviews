import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './../../store/index'

interface AppState {
    isLoading: boolean
    isDialog: boolean
}

const initialState: AppState = {
    isLoading: false,
    isDialog: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isLoading: payload,
        }),
        setIsDialog: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isDialog: payload,
        }),
    },
})

export const { setIsLoading, setIsDialog } = appSlice.actions

export const selectApp = ({ app }: RootState) => app

export default appSlice.reducer
