import { NextFunction, Request, Response } from 'express'
import { MovieDeleterUseCase } from '../../../../../application/useCases/MovieDeleter'
import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'

export const deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const movieId = req.params.id

  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const movieDeleterUseCase = new MovieDeleterUseCase(dynamoDBMovieRepo)

  try {
    const movieDeleted = await movieDeleterUseCase.run(movieId)
    res.json(movieDeleted)
    return
  } catch (e) {
    return next(e)
  }
}
