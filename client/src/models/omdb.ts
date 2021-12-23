export interface IOmdbFilm {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}

export interface IOmdbInputs {
    title: string
    page: number
    type?: 'movie' | 'series'
}
