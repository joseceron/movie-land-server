import { UserSession } from '../entities/UserSession'

export interface UserSessionRepository {
  save: (user: UserSession) => Promise<any>
  get: (user: UserSession) => Promise<any>
  delete: (email: string, token: string) => Promise<any>
}
