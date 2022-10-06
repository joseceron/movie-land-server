import { createMovie } from './createMovie.controller'
import { getAllMovies } from './getAllMovies.controller'
import { getAllmoviesPaginated } from './getAllmoviesPaginated.controller'
import { updateMovie } from './updateMovie.controller'
import { deleteMovie } from './deleteMovie.controller'
import { getMovieById } from './getMovieById.controller'

export {
  createMovie as createMovieController,
  getAllMovies as getAllMoviesController,
  getAllmoviesPaginated as getAllMoviesPaginatedController,
  updateMovie as updateMovieController,
  deleteMovie as deleteMovieController,
  getMovieById as getMovieByIdController
}
