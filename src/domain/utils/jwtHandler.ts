export interface JwtHandler {
  sign: (id: string) => string
  verify: (token: string) => string
}
