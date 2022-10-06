// import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'
import { UserSessionRepository } from '@domain/repositories/UserSessionRepository'

import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { UnableToLoginException } from '../../../../domain/exceptions/UnableToLogin'
import { BcryptHandler } from '@domain/utils/bcryptHandler'
import { JwtHandler } from '@domain/utils/jwtHandler'

interface UserInput {
  email: string
  password: string
}

interface UserSessionInput {
  email: string
  token: string
}

export class UserLoggerUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userSessionRepository: UserSessionRepository

  private readonly _jwtHandler: JwtHandler
  private readonly _bcryptHandler: BcryptHandler

  constructor (
    userRepository: UserRepository,
    userSessionRepository: UserSessionRepository,
    jwtHandler: JwtHandler,
    bcryptHandler: BcryptHandler) {
    this._userRepository = userRepository
    this._userSessionRepository = userSessionRepository
    this._jwtHandler = jwtHandler
    this._bcryptHandler = bcryptHandler
  }

  async run (body: UserInput): Promise<any> {
    const user = await this._userRepository.getByEmail(body.email)

    if (user === null) { throw new UserNotFoundException() }

    const isMatch = await this._bcryptHandler.compare(body.password, user.password)
    if (!isMatch) { throw new UnableToLoginException() }

    const token = this._jwtHandler.sign(body.email)
    const userSession: UserSessionInput = {
      email: body.email,
      token
    }

    await this._userSessionRepository.save(userSession)
    user.token = token
    const { password, ...userDTO } = user
    return userDTO
  }
}
