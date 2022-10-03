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
      const rating: number = item.rating !== undefined ? item.rating.N : ''
      const castAndCrew: string = item.cast_and_crew !== undefined ? item.cast_and_crew.S : ''

      return {
        id: id.split('_')[1],
        title,
        year,
        rating,
        castAndCrew
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
    const rating: string | undefined = item.rating !== undefined ? item.rating.N : ''
    const castAndCrew: string | undefined = item.cast_and_crew !== undefined ? item.cast_and_crew.S : ''

    const movie: Movie = {
      id: idItem.split('_')[1],
      title,
      year,
      rating: Number(rating),
      castAndCrew
    }

    return movie
  }

  // to implement in restAPI
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
    const rating: string | undefined = item.rating !== undefined ? item.rating.N : ''
    const castAndCrew: string | undefined = item.cast_and_crew !== undefined ? item.cast_and_crew.S : ''

    const movie: Movie = {
      id: id.split('_')[1],
      title: titleItem,
      year,
      rating: Number(rating),
      castAndCrew
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
        },
        rating: {
          N: `${movie.rating!}`
        },
        cast_and_crew: {
          S: movie.castAndCrew
        }
      }
    }).promise()

    return movie
  }

  async update (movie: Movie): Promise<Movie> {
    console.log('rating: ', movie)

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
      UpdateExpression: 'set #title = :title, #year = :year, #rating = :rating, #cast_and_crew = :cast_and_crew',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#year': 'year',
        '#rating': 'rating',
        '#cast_and_crew': 'cast_and_crew'
      },
      ExpressionAttributeValues: {
        ':title': {
          S: movie.title
        },
        ':year': {
          S: movie.year
        },
        ':rating': {
          N: `${movie.rating!}`
        },
        ':cast_and_crew': {
          S: movie.castAndCrew
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
