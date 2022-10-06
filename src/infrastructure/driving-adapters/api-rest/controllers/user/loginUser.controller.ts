import { NextFunction, Request, Response } from 'express'

import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { DynamoDBUserSessionRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserSessionRepository'

import { UserLoggerUseCase } from '../../../../../application/useCases/user/UserLogger'

import { JwtTokenHandler } from '../../../../JwtTokenHandler'
import { BcryptTextHandler } from '../../../../BcryptTextEncrypter'

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  const dynamoDBUserRepository = new DynamoDBUserRepository()
  const dynamoDBUserSessionRepository = new DynamoDBUserSessionRepository()

  const jwtTokenHandler = new JwtTokenHandler()
  const bcryptTextHandler = new BcryptTextHandler()

  const userLoggerUserCase = new UserLoggerUseCase(
    dynamoDBUserRepository,
    dynamoDBUserSessionRepository,
    jwtTokenHandler,
    bcryptTextHandler)

  try {
    const body = { email, password }
    const userLogged = await userLoggerUserCase.run(body)
    res.json(userLogged)
  } catch (e) {
    return next(e)
  }
}
