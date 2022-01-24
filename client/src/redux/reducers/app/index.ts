import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface IAsyncAction {
    isSuccess?: boolean
    errorMessage?: string
}

interface AppState {
    isDialog: boolean
    isDrawer: boolean
    isMobileDrawerOpen: boolean
    asyncAction: IAsyncAction
}

const initialState: AppState = {
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
    setIsDialog,
    setIsDrawer,
    setIsMobileDrawerOpen,
    setAsyncAction,
} = appSlice.actions

export const selectApp = ({ app }: RootState) => app

export default appSlice.reducer
