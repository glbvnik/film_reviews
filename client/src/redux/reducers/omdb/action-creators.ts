import { createAction } from '@reduxjs/toolkit'
import { IOmdbFullFilmInputs, IOmdbInputs } from '../../../models/omdb'

export enum OMDB_ACTIONS {
    GET_OMDB_FILMS = 'FETCH_OMDB_FILMS',
    GET_OMDB_FULL_FILM = 'GET_OMDB_FULL_FILM',
}

export const getOmdbFilms = createAction<IOmdbInputs>(
    OMDB_ACTIONS.GET_OMDB_FILMS
)

export const getOmdbFullFilm = createAction<IOmdbFullFilmInputs>(
    OMDB_ACTIONS.GET_OMDB_FULL_FILM
)
