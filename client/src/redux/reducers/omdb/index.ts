import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOmdbFilm } from '../../../models/omdb'
import { RootState } from '../../store'

interface OmdbState {
    films: IOmdbFilm[] | null,
    totalResults: number
}

const initialState: OmdbState = {
    films: null,
    totalResults: 0,
}

const omdbSlice = createSlice({
    name: 'omdb',
    initialState,
    reducers: {
        setOmdb: (state, { payload }: PayloadAction<[IOmdbFilm[], string]>) => ({
            ...state,
            films: payload[0],
            totalResults: +payload[1],
        }),
        clearOmdb: (state) => ({
            ...state,
            ...initialState,
        }),
    },
})

export const { setOmdb, clearOmdb } = omdbSlice.actions

export const selectOmdb = ({ omdb }: RootState) => omdb

export default omdbSlice.reducer
