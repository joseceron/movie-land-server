export interface JwtHandler {
  sign: (email: string) => string
  verify: (token: string) => string
}
