import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/index'

interface IAsyncAction {
    isSuccess?: boolean
    errorMessage?: string
}

interface AppState {
    isLoading: boolean
    isDialog: boolean
    asyncAction: IAsyncAction
}

const initialState: AppState = {
    isLoading: false,
    isDialog: false,
    asyncAction: {
        isSuccess: false,
        errorMessage: '',
    },
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
        setAsyncAction: (state, { payload }: PayloadAction<IAsyncAction>) => ({
            ...state,
            asyncAction: { ...state.asyncAction, ...payload },
        }),
    },
})

export const { setIsLoading, setIsDialog, setAsyncAction } = appSlice.actions

export const selectApp = ({ app }: RootState) => app

export default appSlice.reducer
