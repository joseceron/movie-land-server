import { Router } from 'express'

import {
  getAllMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController
} from '../controllers/index'

const route = Router()

route.get('/:movieId', getMovieByIdController)
route.get('', getAllMoviesController)
route.post('', createMovieController)
route.put('/:movieId', updateMovieController)
route.delete('/:id', deleteMovieController)

export default route
