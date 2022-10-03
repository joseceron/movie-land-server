import { createMovie } from './movie/createMovie.controller'
import { getAllMovies } from './movie/getAllMovies.controller'
import { updateMovie } from './movie/updateMovie.controller'
import { deleteMovie } from './movie/deleteMovie.controller'
import { getMovieById } from './movie/getMovieById.controller'

export {
  createMovie as createMovieController,
  getAllMovies as getAllMoviesController,
  updateMovie as updateMovieController,
  deleteMovie as deleteMovieController,
  getMovieById as getMovieByIdController
}
