import { User } from '../entities/User'
import { UserSession } from '../entities/UserSession'

export interface UserRepository {
  save: (user: User, session: UserSession) => Promise<any>
  login: (user: User) => Promise<any>
  logout: (user: User) => Promise<any>
  getByEmail: (email: string) => Promise<any>
  getByCredentials: (email: string, password: string) => Promise<any>
  update: (user: User) => Promise<any>
}
