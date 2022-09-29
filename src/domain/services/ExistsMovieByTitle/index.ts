import { MovieRepository } from '@domain/repositories/MovieRepository'

export class ExistsMovieByTitle {
  private readonly _movieRepository: MovieRepository

  constructor (movieRepository: MovieRepository) {
    this._movieRepository = movieRepository
  }

  async run (title: string): Promise<boolean> {
    const movie = await this._movieRepository.getByTitle(title)

    if (movie !== null) return true

    return false
  }
}
