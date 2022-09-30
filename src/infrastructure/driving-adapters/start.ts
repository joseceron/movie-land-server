import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { MovieLandBackendApp } from './api-rest/MovieLandBackendApp'
import { MovieLandGraphQL } from './graphql/MovieLandGraphQL'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  })

  new MovieLandBackendApp().start()
  new MovieLandGraphQL().start()
} catch (error) {
  console.log(error)
}
