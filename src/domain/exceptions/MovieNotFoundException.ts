import { Exception } from './Exception'

export class MovieNotFoundException extends Exception {
  constructor () {
    super('Movie not found')
    this.spanishMessage = 'Película no encontrada'
  }
}
