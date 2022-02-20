import axios from 'axios'
import { IOmdbFilm, IOmdbFullFilm, IOmdbInputs } from '../models/omdb'

export const OmdbApi = {
    async fetchFilmsByTitle(inputs: IOmdbInputs) {
        const { data } = await axios.get<{
            Search: IOmdbFilm[]
            totalResults: string
        }>(process.env.NEXT_PUBLIC_OMDB_URL!, {
            params: {
                apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
                s: inputs.title,
                page: inputs.page,
                type: inputs.type,
            },
        })

        return [data.Search ?? [], +data.totalResults || 0]
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
