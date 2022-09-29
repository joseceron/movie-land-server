import { Movie } from '@domain/entities/Movie'
import { MovieRepository } from '@domain/repositories/MovieRepository'

export class InMemoryMovieRepository implements MovieRepository {
  private movieData: Movie[] = []

  async getAll (): Promise<Movie[]> {
    return this.movieData
  }

  async getById (id: string): Promise<Movie | null> {
    const movieFound = this.movieData.find(x => x.id === id)

    if (movieFound === undefined) return null

    return movieFound
  }

  async getByTitle (title: string): Promise<Movie | null> {
    const movieFound = this.movieData.find(x => x.title === title)

    if (movieFound === undefined) return null

    return movieFound
  }

  async save (movie: Movie): Promise<Movie> {
    this.movieData.push(movie)
    return movie
  }

  async delete (movie: Movie): Promise<void> {
    const movies = this.movieData.filter(x => x.id !== movie.id)
    this.movieData = movies
  }

  async update (movie: Movie): Promise<Movie> {
    const movies = this.movieData.filter(x => x.id !== movie.id)
    movies.push(movie)
    this.movieData = movies
    return movie
  }
}
