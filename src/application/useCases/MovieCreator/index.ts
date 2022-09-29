import { Movie } from '@domain/entities/Movie'
import { MovieRepository } from '@domain/repositories/MovieRepository'
import { ExistsMovieByTitle } from '../../../domain/services/ExistsMovieByTitle'
import { MovieAlreadyExistsException } from '../../../domain/exceptions/MovieAlreadyExistsException'
import { UuidGenerator } from '../../../domain/utils/uuidGenerator'

interface MovieInput {
  title: string
  year: string
}

export class MovieCreatorUseCase {
  private readonly _movieRepository: MovieRepository
  private readonly _existsMovieByTitle: ExistsMovieByTitle
  private readonly _uuidGenerator: UuidGenerator

  constructor (movieRepository: MovieRepository, uuidGenerator: UuidGenerator) {
    this._movieRepository = movieRepository
    this._uuidGenerator = uuidGenerator
    this._existsMovieByTitle = new ExistsMovieByTitle(movieRepository)
  }

  async run (params: MovieInput): Promise<Movie> {
    const movie: Movie = {
      id: this._uuidGenerator.generate(),
      title: params.title
    }

    const existsMovie: boolean = await this._existsMovieByTitle.run(movie.title!)
    if (existsMovie) throw new MovieAlreadyExistsException()

    const movieCreated: Movie = await this._movieRepository.save(movie)
    return movieCreated
  }
}
