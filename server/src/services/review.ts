import { Film } from '../db/models/classes/film'
import { Review } from '../db/models/classes/review'
import { IFilm } from '../types/film'

export const ReviewService = {
    async create(
        inputs: { text: string; film: string },
        imageFileName: string,
        userUuId: string
    ) {
        const { text, film } = inputs

        const parsedFilm: IFilm = JSON.parse(film)

        const filmCandidate = await Film.findOne({
            where: { imdbId: parsedFilm.imdbId },
            attributes: ['imdbId'],
        })

        if (!filmCandidate) {
            await Film.create(parsedFilm)
        }

        await Review.create({
            text,
            image: imageFileName,
            filmId: parsedFilm.imdbId,
            userUuId,
        })
    },
}
