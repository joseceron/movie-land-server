import { Genre } from '../entities/Genre'

export interface GenreRepository {
  getAll: () => Promise<Genre[]>
}
