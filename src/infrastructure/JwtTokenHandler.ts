import { JwtHandler } from '@domain/utils/jwtHandler'
import jwt from 'jsonwebtoken'

export class JwtTokenHandler implements JwtHandler {
  private readonly _key = 'thisismytoken'

  sign (email: string): string {
    const token = jwt.sign({ email }, this._key)
    return token
  }

  verify (token: string): string {
    const decoded: any = jwt.verify(token, this._key)
    const email = decoded.email

    return email
  }
}
