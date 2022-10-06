// import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'
// import { ExistsUserByEmail } from '../../../../domain/services/ExistsUserByEmail'
// import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
// import { UuidGenerator } from '@domain/utils/uuidGenerator'
// import { BcryptHandler } from '@domain/utils/bcryptHandler'
import { JwtHandler } from '@domain/utils/jwtHandler'

interface UserInput {
  email: string
  password: string
  // token: string
}

export class UserLoggerUseCase {
  private readonly _userRepository: UserRepository
  // private readonly _existUserByEmail: ExistsUserByEmail
  // private readonly _uuidGenerator: UuidGenerator
  // private readonly _bcryptHandler: BcryptHandler
  private readonly _jwtHandler: JwtHandler

  constructor (userRepository: UserRepository, jwtHandler: JwtHandler) {
    this._userRepository = userRepository
    this._jwtHandler = jwtHandler
  }

  async run (body: UserInput): Promise<any> {
    return ''
  }
}
