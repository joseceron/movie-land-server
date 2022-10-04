import { Genre } from '@domain/entities/Genre'
import { GenreRepository } from '../../../domain/repositories/GenreRepository'

export class GenreGetterUseCase {
  private readonly _genreRepository: GenreRepository

  constructor (genreRepository: GenreRepository) {
    this._genreRepository = genreRepository
  }

  async run (): Promise<Genre[]> {
    const genres: Genre[] = await this._genreRepository.getAll()
    return genres
  }
}
