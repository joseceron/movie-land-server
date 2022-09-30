import { DynamoDBMovieRepository } from '@infrastructure/implementations/Aws/dynamo-db/DynamoDBMovieRepository'
import { MovieCreatorUseCase } from '@application/useCases/MovieCreator'
import { UuidV4Generator } from '@infrastructure/Uuidv4Generator'
import { HandlerError } from '../../utils/HandlerError'

const movieMutations = {
  createMovie: async (_: any, args: any) => {
    const {
      movie: {
        title,
        year
      }
    } = args

    const dynamoDBMovieRepo = new DynamoDBMovieRepository()
    const uuidGenerator = new UuidV4Generator()
    const movieCreatorUseCase = new MovieCreatorUseCase(dynamoDBMovieRepo, uuidGenerator)

    try {
      const movieCreated = await movieCreatorUseCase.run({
        title,
        year
      })

      return movieCreated
    } catch (error) {
      return HandlerError.run(error)
    }
  }
}

export default movieMutations
