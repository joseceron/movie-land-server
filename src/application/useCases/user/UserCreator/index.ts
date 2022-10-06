import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'
import { ExistsUserByEmail } from '../../../../domain/services/ExistsUserByEmail'
import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UuidGenerator } from '@domain/utils/uuidGenerator'
import { BcryptHandler } from '@domain/utils/bcryptHandler'
import { JwtHandler } from '@domain/utils/jwtHandler'

interface UserInput {
  email: string
  password: string
  // token: string
}

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByEmail: ExistsUserByEmail
  private readonly _uuidGenerator: UuidGenerator
  private readonly _bcryptHandler: BcryptHandler
  private readonly _jwtHandler: JwtHandler

  constructor (
    userRepository: UserRepository,
    uuidGenerator: UuidGenerator,
    bcrypHandler: BcryptHandler,
    jwtHandler: JwtHandler) {
    this._userRepository = userRepository
    this._uuidGenerator = uuidGenerator
    this._bcryptHandler = bcrypHandler
    this._jwtHandler = jwtHandler

    this._existUserByEmail = new ExistsUserByEmail(userRepository)
  }

  async run (body: UserInput): Promise<any> {
    const encryptedPassword = await this._bcryptHandler.encrypt(body.password)

    const user: User = {
      id: this._uuidGenerator.generate(),
      email: body.email,
      password: encryptedPassword,
      token: ''
    }
    const existsUser: boolean = await this._existUserByEmail.run(user.email)

    if (existsUser) throw new UserAlreadyExistsException()

    const token = this._jwtHandler.sign(user.email)
    user.token = token

    const userCreated: User = await this._userRepository.save(user)
    return userCreated
  }
}
