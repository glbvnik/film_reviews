import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOmdbFilm, IOmdbFullFilm } from '../../../models/omdb'
import { RootState } from '../../store'

interface OmdbState {
    films: IOmdbFilm[] | null
    totalResults: number
    currentFilm: IOmdbFullFilm | null
    page: number
}

const initialState: OmdbState = {
    films: null,
    totalResults: 0,
    currentFilm: null,
    page: 1,
}

const omdbSlice = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        setOmdb: (
            state,
            { payload }: PayloadAction<[IOmdbFilm[], string]>
        ) => ({
            ...state,
            films: payload[0],
            totalResults: +payload[1],
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
    },
})

export const {
    setOmdb,
    clearOmdb,
    setOmdbCurrentFilm,
    clearOmdbCurrentFilm,
    setOmdbPage,
} = omdbSlice.actions

export const selectOmdb = ({ omdb }: RootState) => omdb

export default omdbSlice.reducer
