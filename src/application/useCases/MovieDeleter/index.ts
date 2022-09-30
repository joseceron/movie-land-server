import { Movie } from '../../../domain/entities/Movie'
import { MovieRepository } from '../../../domain/repositories/MovieRepository'
import { MovieGetterById } from '../../../domain/services/MovieGetterById'

export class MovieDeleterUseCase {
  private readonly _movieRepository: MovieRepository
  private readonly _movieGetterById: MovieGetterById

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
    this._movieGetterById = new MovieGetterById(movieRepository)
  }

  async run (movieId: string): Promise<Movie> {
    const movieToDelete = await this._movieGetterById.run(movieId)

    await this._movieRepository.delete(movieToDelete)

    return movieToDelete
  }
}
