import { NextFunction, Request, Response } from 'express'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieGetterByGenreIdUseCase } from '../../../../../application/useCases/MovieGetterByGenreId'

import { DynamoDBGenreRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBGenreRepository'
import { GenreGetterUseCase } from '../../../../../application/useCases/GenreGetter'

export const getAllmoviesPaginated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieGetterByGenreIdUseCase = new MovieGetterByGenreIdUseCase(dynamoDBMovieRepo)

  const dynamoDBGenreRepo = new DynamoDBGenreRepository()
  const genreGetterUserCase = new GenreGetterUseCase(dynamoDBGenreRepo)

  try {
    const genres = await genreGetterUserCase.run()

    const promises = genres.map(async (item) => await movieGetterByGenreIdUseCase.run(item.id))
    const movies: any = await Promise.all(promises)

    const moviesPaginated: any = []

    genres.forEach((genre, i) => {
      const item = {
        ...genre,
        ...movies[i]
      }

      moviesPaginated.push(item)
    })

    res.json(moviesPaginated)
    return
  } catch (e) {
    return next(e)
  }
}
