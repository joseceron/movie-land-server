// import { UserSession } from 'domain/entities/UserSession'
import { UserSessionRepository } from 'domain/repositories/UserSessionRepository'

import { UnableToLoginException } from '../../../../domain/exceptions/UnableToLogin'

export class UserSessionDeleterUseCase {
  private readonly _userSessionRepository: UserSessionRepository

  constructor (userSessionRepository: UserSessionRepository) {
    this._userSessionRepository = userSessionRepository
  }

  async run (email: string, token: string): Promise<any> {
    try {
      await this._userSessionRepository.delete(email, token)
      return
    } catch (error) {
      throw new UnableToLoginException()
    }
  }
}
