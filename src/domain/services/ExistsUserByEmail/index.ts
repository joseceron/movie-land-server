import { UserRepository } from '@domain/repositories/UserRepository'

export class ExistsUserByEmail {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (email: string): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email)

    if (user !== null) return true

    return false
  }
}
