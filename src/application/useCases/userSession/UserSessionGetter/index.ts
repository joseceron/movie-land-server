import { UserSession } from 'domain/entities/UserSession'
import { UserSessionRepository } from 'domain/repositories/UserSessionRepository'

import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { UnableToGetSessionException } from '../../../../domain/exceptions/UnableToGetSessionException'

import { JwtHandler } from '@domain/utils/jwtHandler'

export class UserSessionGetter {
  private readonly _userSessionRepository: UserSessionRepository
  private readonly _jwtHandler: JwtHandler

  constructor (
    userSessionRepository: UserSessionRepository,
    jwtHandler: JwtHandler) {
    this._userSessionRepository = userSessionRepository
    this._jwtHandler = jwtHandler
  }

  async run (token: string): Promise<any> {
    try {
      const email = this._jwtHandler.verify(token)
      const userSession: UserSession = { email, token }
      const user = await this._userSessionRepository.get(userSession)

      if (user === null) { throw new UserNotFoundException() }
      return user
    } catch (error) {
      throw new UnableToGetSessionException()
    }
  }
}
