import { UserSession } from '../entities/UserSession'

export interface UserSessionRepository {
  save: (user: UserSession) => Promise<any>
}
