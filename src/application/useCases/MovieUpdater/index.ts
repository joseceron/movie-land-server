import { Movie } from '../../../domain/entities/Movie'
import { MovieRepository } from '../../../domain/repositories/MovieRepository'
import { MovieGetterById } from '../../../domain/services/MovieGetterById'

export class MovieUpdaterUseCase {
  private readonly _movieRepository: MovieRepository
  private readonly _movieGetterById: MovieGetterById

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
    this._movieGetterById = new MovieGetterById(movieRepository)
  }

  async run (data: Movie): Promise<Movie> {
    const movie = await this._movieGetterById.run(data.id)

    const dataToUpdate: Movie = {
      id: data.id,
      title: data.title ?? movie.title,
      year: movie.year,
      rating: data.rating ?? movie.rating,
      castAndCrew: data.castAndCrew ?? movie.castAndCrew,
      genre: data.genre ?? movie.genre
    }

    const movieUpdated: Movie = await this._movieRepository.update(dataToUpdate)
    return movieUpdated
  }
}
