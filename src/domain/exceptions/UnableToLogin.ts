import { Exception } from './Exception'

export class UnableToLoginException extends Exception {
  constructor () {
    super('Unable to login')
    this.spanishMessage = 'No se pudo iniciar sesión'
  }
}
