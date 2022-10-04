import { Movie } from '../../../domain/entities/Movie'
import { MovieRepository } from '../../../domain/repositories/MovieRepository'

export class MovieGetterByGenreIdUseCase {
  private readonly _movieRepository: MovieRepository

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
  }

  async run (id: number): Promise<Movie[]> {
    const movies = await this._movieRepository.getByGenre(id)
    return movies
  }
}
