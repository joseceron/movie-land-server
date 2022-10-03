import { NextFunction, Request, Response } from 'express'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieGetterByIdUseCase } from '../../../../../application/useCases/MovieGetterById'

export const getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const movieId = req.params.movieId

  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieGetterByIdUseCase = new MovieGetterByIdUseCase(dynamoDBMovieRepo)

  try {
    const movie = await movieGetterByIdUseCase.run(movieId)
    res.json(movie)
    return
  } catch (e) {
    return next(e)
  }
}
