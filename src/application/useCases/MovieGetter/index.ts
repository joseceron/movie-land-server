import { Movie } from '@domain/entities/Movie'
import { MovieRepository } from '../../../domain/repositories/MovieRepository'

export class MovieGetterUseCase {
  private readonly _movieRepository: MovieRepository

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
  }

  async run (): Promise<Movie[]> {
    const movies: Movie[] = await this._movieRepository.getAll()
    return movies
  }
}
