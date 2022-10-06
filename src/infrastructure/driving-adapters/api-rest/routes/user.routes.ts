import { Router } from 'express'

import {
  createUserController,
  loginUserController
} from '../controllers/user/index'

const route = Router()

route.post('/', createUserController)
route.post('/login', loginUserController)

export default route
