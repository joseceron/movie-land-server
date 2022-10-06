import { Exception } from './Exception'

export class MissingTokenException extends Exception {
  constructor () {
    super('Missing token')
    this.spanishMessage = 'Token obligatorio'
  }
}
