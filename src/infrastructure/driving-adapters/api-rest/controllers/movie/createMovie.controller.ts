import { NextFunction, Request, Response } from 'express'
// import { DynamoDBMovieRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { DynamoDBMovieRepository } from '@infrastructure/implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieCreatorUseCase } from '@application/useCases/MovieCreator'
// import { MovieCreatorUseCase } from '../../../../../application/useCases/MovieCreator'
import { UuidV4Generator } from '../../../../Uuidv4Generator'

export const createMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    year
  } = req.body

  const dynamoDBMovieRepo = new DynamoDBMovieRepository()
  const uuidV4Generator = new UuidV4Generator()
  const movieCreatorUseCase = new MovieCreatorUseCase(dynamoDBMovieRepo, uuidV4Generator)

  try {
    const movieCreated = await movieCreatorUseCase.run({
      title,
      year
    })

    res.status(201).json(movieCreated)
    return
  } catch (e) {
    return next(e)
  }
}
