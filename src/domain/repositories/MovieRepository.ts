import { Movie } from '../entities/Movie'

export interface MovieRepository {
  getAll: () => Promise<Movie[]>
  getById: (id: string) => Promise<Movie | null>
  getByTitle: (title: string) => Promise<Movie | null>
  save: (movie: Movie) => Promise<Movie>
  update: (movie: Movie) => Promise<Movie>
  delete: (movie: Movie) => Promise<void>
}
