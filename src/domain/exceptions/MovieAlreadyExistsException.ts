import { Exception } from './Exception'

export class MovieAlreadyExistsException extends Exception {
  constructor () {
    super('Movie already exists')
    this.spanishMessage = 'La película ya existe'
  }
}
