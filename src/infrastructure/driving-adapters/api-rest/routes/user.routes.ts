import { Router } from 'express'

import { createUserController } from '../controllers/user/index'

const route = Router()

route.post('/', createUserController)

export default route
