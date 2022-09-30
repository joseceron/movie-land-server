import { Movie } from 'domain/entities/Movie'
import { MovieRepository } from 'domain/repositories/MovieRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBMovieRepository implements MovieRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<Movie[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'MOVIE'
        }
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const movies = items.map((item: any) => {
      const id: string = item['MOVIE-LAND_PK'].S ?? ''
      const title: string = item.title.S ?? ''
      const year: string = item.year.S ?? ''

      return {
        id: id.split('_')[1],
        title,
        year
      }
    })

    return movies
  }

  async getById (id: string): Promise<Movie | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'MOVIE-LAND_PK'
      },
      ExpressionAttributeValues: {
        ':pk': {
          S: `MOVIE_${id}`
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const idItem: string = item['MOVIE-LAND_PK'].S ?? ''
    const title: string = item.title.S ?? ''
    const year: string = item.year.S ?? ''

    const movie: Movie = {
      id: idItem.split('_')[1],
      title,
      year
    }

    return movie
  }

  async getByTitle (title: string): Promise<Movie | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'title = :title',
      ExpressionAttributeValues: {
        ':title': {
          S: title
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const id: string = item['MOVIE-LAND_PK'].S ?? ''
    const titleItem: string = item.title.S ?? ''
    const year: string = item.year.S ?? ''

    const movie: Movie = {
      id: id.split('_')[1],
      title: titleItem,
      year
    }

    return movie
  }

  async save (movie: Movie): Promise<Movie> {
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'MOVIE-LAND_PK': {
          S: `MOVIE_${movie.id}`
        },
        'MOVIE-LAND_SK': {
          S: `MOVIE_${movie.id}`
        },
        ENTITY_TYPE: {
          S: 'MOVIE'
        },
        title: {
          S: movie.title
        },
        year: {
          S: movie.year
        }
      }
    }).promise()

    return movie
  }

  async update (movie: Movie): Promise<Movie> {
    await this._db.updateItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'MOVIE-LAND_PK': {
          S: `MOVIE_${movie.id}`
        },
        'MOVIE-LAND_SK': {
          S: `MOVIE_${movie.id}`
        }
      },
      UpdateExpression: 'set #title = :title, #year = :year',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#year': 'year'
      },
      ExpressionAttributeValues: {
        ':title': {
          S: movie.title
        },
        ':year': {
          S: movie.year
        }
      }
    }).promise()

    return movie
  }

  async delete (movie: Movie): Promise<void> {
    await this._db.deleteItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'MOVIE-LAND_PK': {
          S: `MOVIE_${movie.id}`
        },
        'MOVIE-LAND_SK': {
          S: `MOVIE_${movie.id}`
        }
      }
    }).promise()
  }
}
