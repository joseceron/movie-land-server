import { User } from '../entities/User'

export interface UserRepository {
  save: (user: User) => Promise<any>
  login: (user: User) => Promise<any>
  logout: (user: User) => Promise<any>
  getByEmail: (email: string) => Promise<any>
  update: (user: User) => Promise<any>
}
