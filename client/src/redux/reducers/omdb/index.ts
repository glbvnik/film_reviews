import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOmdbFilm, IOmdbFullFilm } from '../../../models/omdb'
import { RootState } from '../../store'

interface OmdbState {
    films: IOmdbFilm[] | null
    totalResults: number
    currentFilm: IOmdbFullFilm | null
    page: number
    isOmdbLoading: boolean
}

const initialState: OmdbState = {
    films: null,
    totalResults: 0,
    currentFilm: null,
    page: 1,
    isOmdbLoading: false,
}

const omdbSlice = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        setOmdb: (
            state,
            { payload }: PayloadAction<[IOmdbFilm[], number]>
        ) => ({
            ...state,
            films: payload[0],
            totalResults: payload[1],
        }),
        clearOmdb: (state) => ({
            ...state,
            ...initialState,
        }),
        setOmdbCurrentFilm: (
            state,
            { payload }: PayloadAction<IOmdbFullFilm>
        ) => ({
            ...state,
            currentFilm: payload,
        }),
        clearOmdbCurrentFilm: (state) => ({
            ...state,
            currentFilm: null,
        }),
        setOmdbPage: (state, { payload }: PayloadAction<number>) => ({
            ...state,
            page: payload,
        }),
        setIsOmdbLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isOmdbLoading: payload,
        }),
    },
})

export const {
    setOmdb,
    clearOmdb,
    setOmdbCurrentFilm,
    clearOmdbCurrentFilm,
    setOmdbPage,
    setIsOmdbLoading,
} = omdbSlice.actions

export const omdbSelectors = {
    omdb: ({ omdb }: RootState) => omdb,
    films: ({ omdb }: RootState) => omdb.films,
    totalResults: ({ omdb }: RootState) => omdb.totalResults,
    currentFilm: ({ omdb }: RootState) => omdb.currentFilm,
    page: ({ omdb }: RootState) => omdb.page,
    isOmdbLoading: ({ omdb }: RootState) => omdb.isOmdbLoading,
}

export default omdbSlice.reducer
