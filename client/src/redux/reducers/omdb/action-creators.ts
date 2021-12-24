import { createAction } from '@reduxjs/toolkit'
import { IOmdbInputs } from '../../../models/omdb'

export enum OMDB_ACTIONS {
    FETCH_OMDB_FILMS = 'FETCH_OMDB_FILMS',
}

export const fetchOmdbFilms = createAction<IOmdbInputs>(
    OMDB_ACTIONS.FETCH_OMDB_FILMS
)
