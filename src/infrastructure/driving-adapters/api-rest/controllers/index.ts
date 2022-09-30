import { createMovie } from './movie/createMovie.controller'
import { getAllMovies } from './movie/getAllMovies.controller'
import { updateMovie } from './movie/updateMovie.controller'
import { deleteMovie } from './movie/deleteMovie.controller'

export {
  createMovie as createMovieController,
  getAllMovies as getAllMoviesController,
  updateMovie as updateMovieController,
  deleteMovie as deleteMovieController
}
