import axios from 'axios'
import { IOmdbFilm } from '../models/omdb'

export const OmdbApi = {
    async getFilmsByTitle(title: string, page: number, type: 'movie' | 'series' = 'movie') {
        const { data } = await axios.get<{ Search: IOmdbFilm[], totalResults: string }>('http://www.omdbapi.com', {
            params: {
                apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
                s: title,
                page,
                type,
            },
        })

        return [data.Search, data.totalResults]
    },
}
