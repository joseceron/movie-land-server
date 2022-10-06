import { Router } from 'express'

import {
  getAllMoviesController,
  getAllMoviesPaginatedController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController
} from '../controllers/movie/index'

const route = Router()

route.get('/paginated', getAllMoviesPaginatedController)
route.get('', getAllMoviesController)
route.get('/:movieId', getMovieByIdController)
route.post('', createMovieController)
route.put('/:movieId', updateMovieController)
route.delete('/:id', deleteMovieController)

export default route
