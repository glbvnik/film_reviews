import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReviewActionsEnum } from '../../../models/review'
import { RootState } from '../../store'

interface IAsyncAction {
    type?: ReviewActionsEnum | ''
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
        type: '',
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
        clearAsyncAction: (state) => ({
            ...state,
            asyncAction: initialState.asyncAction,
        }),
    },
})

export const {
    setIsDialog,
    setIsDrawer,
    setIsMobileDrawerOpen,
    setAsyncAction,
    clearAsyncAction,
} = appSlice.actions

export const appSelectors = {
    app: ({ app }: RootState) => app,
    isDialog: ({ app }: RootState) => app.isDialog,
    isDrawer: ({ app }: RootState) => app.isDrawer,
    isMobileDrawerOpen: ({ app }: RootState) => app.isMobileDrawerOpen,
    asyncAction: ({ app }: RootState) => app.asyncAction,
}

export default appSlice.reducer
