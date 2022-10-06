import { NextFunction, Request, Response } from 'express'

import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'

import { UserCreatorUseCase } from '../../../../../application/useCases/user/UserCreator'
import { UuidV4Generator } from '../../../../Uuidv4Generator'
import { BcryptTextHandler } from '../../../../BcryptTextEncrypter'
import { JwtTokenHandler } from '../../../../JwtTokenHandler'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  const dynamoDBUserRepository = new DynamoDBUserRepository()

  const uuidV4Generator = new UuidV4Generator()
  const bcryptTextHandler = new BcryptTextHandler()
  const jwtTokenHandler = new JwtTokenHandler()

  const userCreatorUseCase = new UserCreatorUseCase(
    dynamoDBUserRepository,
    uuidV4Generator,
    bcryptTextHandler,
    jwtTokenHandler
  )

  try {
    const body = { email, password }
    const userCreated = await userCreatorUseCase.run(body)
    res.status(201).json(userCreated)
  } catch (e) {
    return next(e)
  }
}
