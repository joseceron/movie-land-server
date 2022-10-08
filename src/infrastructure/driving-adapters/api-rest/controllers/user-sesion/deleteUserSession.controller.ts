import { NextFunction, Request, Response } from 'express'

import { DynamoDBUserSessionRepository } from '../../../../implementations/Aws/dynamo-db/DynamoDBUserSessionRepository'

import { UserSessionDeleterUseCase } from '../../../../../application/useCases/userSession/UserSessionDeleter'

export const deleteUserSession = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  const { email, token } = req.userSession

  const dynamoDBUserSessionRepository = new DynamoDBUserSessionRepository()

  const userSessionDeleterUseCase = new UserSessionDeleterUseCase(dynamoDBUserSessionRepository)

  try {
    await userSessionDeleterUseCase.run(email, token)
    res.status(204).send()
  } catch (e) {
    return next(e)
  }
}
