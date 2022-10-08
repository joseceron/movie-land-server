import { Exception } from './Exception'

export class UnableToGetSessionException extends Exception {
  constructor () {
    super('Unable to get user session')
    this.spanishMessage = 'No se obtuvo datos de session'
  }
}
