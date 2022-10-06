import { NextFunction, Response } from 'express'

import { JwtTokenHandler } from '../../../JwtTokenHandler'
import { DynamoDBUserSessionRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserSessionRepository'
import { UserSessionGetter } from '../../../../application/useCases/userSession/UserSessionGetter'
import { MissingTokenException } from '../../../../domain/exceptions/MissingTokenException'

export const auth = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBUserSessionRepository = new DynamoDBUserSessionRepository()
  const jwtTokenHandler = new JwtTokenHandler()
  const userSessionGetter = new UserSessionGetter(dynamoDBUserSessionRepository, jwtTokenHandler)

  try {
    if (req.header('Authorization') === undefined) { throw new MissingTokenException() }
    const token = req.header('Authorization')!.replace('Bearer ', '')
    const userSession = await userSessionGetter.run(token)
    req.userSession = userSession
    next()
  } catch (e) {
    return next(e)
  }
}
