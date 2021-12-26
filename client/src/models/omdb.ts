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

export interface IOmdbFullFilm {
    imdbID: string
    Title: string
    Year: string
    Country: string
    Genre: string
    Runtime: string
    Director: string
    Actors: string
    imdbRating: string
    Plot: string
    Poster: string
}

export interface IOmdbFullFilmInputs {
    imdbId: string
    title: string
}
