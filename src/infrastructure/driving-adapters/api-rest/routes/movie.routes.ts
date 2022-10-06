import { Router } from 'express'
import { auth } from '../middleware/auth'

import {
  getAllMoviesController,
  getAllMoviesPaginatedController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController
} from '../controllers/movie/index'

const route = Router()

route.get('/paginated', auth, getAllMoviesPaginatedController)
route.get('', auth, getAllMoviesController)
route.get('/:movieId', auth, getMovieByIdController)
route.post('', auth, createMovieController)
route.put('/:movieId', auth, updateMovieController)
route.delete('/:id', auth, deleteMovieController)

export default route
