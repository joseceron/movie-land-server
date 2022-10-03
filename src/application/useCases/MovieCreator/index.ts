import { Movie } from '@domain/entities/Movie'
import { MovieRepository } from '@domain/repositories/MovieRepository'
import { ExistsMovieByTitle } from '../../../domain/services/ExistsMovieByTitle'
import { MovieAlreadyExistsException } from '../../../domain/exceptions/MovieAlreadyExistsException'
import { UuidGenerator } from '../../../domain/utils/uuidGenerator'

interface MovieInput {
  title: string
  year: string
  rating: number
  castAndCrew: string
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

  async run (body: MovieInput): Promise<Movie> {
    //  TODO: add field validation is someone is missing

    const movie: Movie = {
      id: this._uuidGenerator.generate(),
      title: body.title,
      year: body.year,
      rating: body.rating,
      castAndCrew: body.castAndCrew
    }

    const existsMovie: boolean = await this._existsMovieByTitle.run(movie.title!)
    if (existsMovie) throw new MovieAlreadyExistsException()

    const movieCreated: Movie = await this._movieRepository.save(movie)
    return movieCreated
  }
}
