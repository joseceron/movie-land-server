import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserLoggerUseCase } from '../../../../../application/useCases/user/UserLogger'
// import { UuidV4Generator } from '../../../../Uuidv4Generator'
// import { BcryptTextHandler } from '../../../../BcryptTextEncrypter'
import { JwtTokenHandler } from '../../../../JwtTokenHandler'

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  const dynamoDBUserRepository = new DynamoDBUserRepository()
  const jwtTokenHandler = new JwtTokenHandler()

  const userLoggerUserCase = new UserLoggerUseCase(dynamoDBUserRepository, jwtTokenHandler)

  try {
    const body = { email, password }
    const userLogged = await userLoggerUserCase.run(body)
    res.json(userLogged)
  } catch (e) {
    return next(e)
  }
}
