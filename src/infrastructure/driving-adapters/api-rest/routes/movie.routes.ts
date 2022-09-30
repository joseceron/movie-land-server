import { Router } from 'express'

import {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController
} from '../controllers/index'

const route = Router()

route.get('', getAllMoviesController)
route.post('', createMovieController)
route.put('/:movieId', updateMovieController)
route.delete('/:id', deleteMovieController)

export default route
