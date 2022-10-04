import { createMovie } from './movie/createMovie.controller'
import { getAllMovies } from './movie/getAllMovies.controller'
import { getAllmoviesPaginated } from './movie/getAllmoviesPaginated.controller'
import { updateMovie } from './movie/updateMovie.controller'
import { deleteMovie } from './movie/deleteMovie.controller'
import { getMovieById } from './movie/getMovieById.controller'

export {
  createMovie as createMovieController,
  getAllMovies as getAllMoviesController,
  getAllmoviesPaginated as getAllMoviesPaginatedController,
  updateMovie as updateMovieController,
  deleteMovie as deleteMovieController,
  getMovieById as getMovieByIdController
}
