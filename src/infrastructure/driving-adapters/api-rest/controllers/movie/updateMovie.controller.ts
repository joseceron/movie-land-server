import { NextFunction, Request, Response } from 'express'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieUpdaterUseCase } from '../../../../../application/useCases/MovieUpdater'
import { Movie } from 'domain/entities/Movie'

export const updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    year,
    rating,
    castAndCrew
  } = req.body

  const movieId = req.params.movieId

  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieUpdaterUseCase = new MovieUpdaterUseCase(dynamoDBMovieRepo)

  try {
    const movieToUpdate: Movie = {
      id: movieId,
      title,
      year,
      rating,
      castAndCrew
    }

    const movie = await movieUpdaterUseCase.run(movieToUpdate)
    res.json(movie)
    return
  } catch (e) {
    return next(e)
  }
}
