import { Movie } from '../../../domain/entities/Movie'
import { MovieRepository } from '../../../domain/repositories/MovieRepository'
import { MovieGetterById } from '../../../domain/services/MovieGetterById'

export class MovieGetterByIdUseCase {
  private readonly _movieGetterById: MovieGetterById

  constructor (movieRepository: MovieRepository) {
    this._movieGetterById = new MovieGetterById(movieRepository)
  }

  async run (id: string): Promise<Movie> {
    const movie = await this._movieGetterById.run(id)
    return movie
  }
}
