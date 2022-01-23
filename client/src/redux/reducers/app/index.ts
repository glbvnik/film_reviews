import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface IAsyncAction {
    isSuccess?: boolean
    errorMessage?: string
}

interface AppState {
    isLoading: boolean
    isDialog: boolean
    isDrawer: boolean
    isMobileDrawerOpen: boolean
    asyncAction: IAsyncAction
}

const initialState: AppState = {
    isLoading: false,
    isDialog: false,
    isDrawer: false,
    isMobileDrawerOpen: false,
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
        setIsDrawer: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isDrawer: payload,
        }),
        setIsMobileDrawerOpen: (
            state,
            { payload }: PayloadAction<boolean>
        ) => ({
            ...state,
            isMobileDrawerOpen: payload,
        }),
        setAsyncAction: (state, { payload }: PayloadAction<IAsyncAction>) => ({
            ...state,
            asyncAction: { ...state.asyncAction, ...payload },
        }),
    },
})

export const {
    setIsLoading,
    setIsDialog,
    setIsDrawer,
    setIsMobileDrawerOpen,
    setAsyncAction,
} = appSlice.actions

export const selectApp = ({ app }: RootState) => app

export default appSlice.reducer
