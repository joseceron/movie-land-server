import { NextFunction, Request, Response } from 'express'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieGetterUseCase } from '../../../../../application/useCases/MovieGetter'

import { DynamoDBGenreRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBGenreRepository'
import { GenreGetterUseCase } from '../../../../../application/useCases/GenreGetter'

export const getAllMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieGetterUseCase = new MovieGetterUseCase(dynamoDBMovieRepo)

  const dynamoDBGenreRepo = new DynamoDBGenreRepository()
  const genreGetterUserCase = new GenreGetterUseCase(dynamoDBGenreRepo)

  try {
    const genres = await genreGetterUserCase.run()
    const movies = await movieGetterUseCase.run()

    const payload = {
      genres,
      movies
    }

    res.json(payload)
    return
  } catch (e) {
    return next(e)
  }
}
