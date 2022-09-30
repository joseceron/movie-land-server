import { NextFunction, Request, Response } from 'express'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieGetterUseCase } from '../../../../../application/useCases/MovieGetter'

export const getAllMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieGetterUseCase = new MovieGetterUseCase(dynamoDBMovieRepo)

  try {
    const movies = await movieGetterUseCase.run()
    res.json(movies)
    return
  } catch (e) {
    return next(e)
  }
}
