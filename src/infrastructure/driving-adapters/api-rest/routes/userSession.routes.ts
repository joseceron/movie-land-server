import { Router } from 'express'
import { auth } from '../middleware/auth'

import {
  deleteUserSessionController
} from '../controllers/user-sesion/index'

const route = Router()

route.delete('/', auth, deleteUserSessionController)

export default route
