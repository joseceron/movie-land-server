import { Movie } from 'domain/entities/Movie'
import { MovieRepository } from 'domain/repositories/MovieRepository'
import { MovieNotFoundException } from '../../exceptions/MovieNotFoundException'

export class MovieGetterById {
  private readonly _movieRepository: MovieRepository

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
  }

  async run (id: string): Promise<Movie> {
    const movie = await this._movieRepository.getById(id)

    if (movie === null) { throw new MovieNotFoundException() }

    return movie
  }
}
