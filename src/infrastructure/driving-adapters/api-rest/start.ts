import path from 'path'
import * as dotenv from 'dotenv'
import { MovieLandBackendApp } from './MovieLandBackendApp'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new MovieLandBackendApp().start()
} catch (error) {
  console.log(error)
}
