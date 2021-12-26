import axios from 'axios'
import { IOmdbFilm, IOmdbFullFilm } from '../models/omdb'

export const OmdbApi = {
    async fetchFilmsByTitle(
        title: string,
        page: number,
        type: 'movie' | 'series' = 'movie'
    ) {
        const { data } = await axios.get<{
            Search: IOmdbFilm[]
            totalResults: string
        }>(process.env.NEXT_PUBLIC_OMDB_URL!, {
            params: {
                apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
                s: title,
                page,
                type,
            },
        })

        return [data.Search, data.totalResults]
    },
    async fetchFullFilm(imdbId: string, title: string) {
        const { data } = await axios.get<IOmdbFullFilm>(
            process.env.NEXT_PUBLIC_OMDB_URL!,
            {
                params: {
                    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
                    i: imdbId,
                    t: title,
                },
            }
        )

        return data
    },
}
