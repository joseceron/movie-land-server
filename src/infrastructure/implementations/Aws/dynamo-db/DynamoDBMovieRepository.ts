import { Movie } from 'domain/entities/Movie'
import { MovieRepository } from 'domain/repositories/MovieRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBMovieRepository implements MovieRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<any[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME
    }).promise()

    const items = (response.Items != null) ? response.Items : []
    const movies = items.map((item: any) => {
      const id: string = item.movie_pk ?? ''
      const year: string = item.year_sk ?? ''
      const title: string = item.title ?? ''
      const rating: number = item.rating !== undefined ? item.rating.N : ''
      const castAndCrew: string = item.cast_and_crew !== undefined ? item.cast_and_crew : ''
      const genre: string = item.genre ?? ''

      return {
        id,
        title,
        year,
        rating,
        castAndCrew,
        genre
      }
    })

    return movies
  }

  async getById (id: string): Promise<Movie | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'movie_pk'
      },
      ExpressionAttributeValues: {
        ':pk': id
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const idItem: string = item.movie_pk ?? ''
    const title: string = item.title ?? ''
    const year: string = item.year_sk ?? ''
    const genre: string = item.genre ?? ''
    const rating: string | undefined = item.rating !== undefined ? item.rating : ''
    const castAndCrew: string | undefined = item.cast_and_crew !== undefined ? item.cast_and_crew : ''

    const movie: Movie = {
      id: idItem,
      title,
      year,
      rating: Number(rating),
      castAndCrew,
      genre
    }

    return movie
  }

  // TODO: implement in restAPI and useCases
  async getByTitle (title: string): Promise<Movie | null> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#t = :title',
      ExpressionAttributeNames: {
        '#t': 'title'
      },
      ExpressionAttributeValues: {
        ':title': title
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const idItem: string = item.movie_pk ?? ''
    const titleItem: string = item.title ?? ''
    const year: string = item.year_sk ?? ''
    const genre: string = item.genre ?? ''
    const rating: string | undefined = item.rating !== undefined ? item.rating : ''
    const castAndCrew: string | undefined = item.cast_and_crew !== undefined ? item.cast_and_crew : ''

    const movie: Movie = {
      id: idItem,
      title: titleItem,
      year,
      rating: Number(rating),
      castAndCrew,
      genre
    }

    return movie
  }

  async save (movie: Movie): Promise<Movie> {
    await this._db.put({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        movie_pk: movie.id,
        year_sk: movie.year,
        title: movie.title,
        cast_and_crew: movie.castAndCrew,
        rating: movie.rating,
        genre: movie.genre
      }
    }).promise()

    return movie
  }

  async update (movie: Movie): Promise<Movie> {
    await this._db.update({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        movie_pk: movie.id,
        year_sk: movie.year
      },
      UpdateExpression: 'set #t = :title, #rating = :rating, #cast = :cast_and_crew, #genre = :genre',
      ExpressionAttributeNames: {
        '#t': 'title',
        '#rating': 'rating',
        '#cast': 'cast_and_crew',
        '#genre': 'genre'
      },
      ExpressionAttributeValues: {
        ':title': movie.title,
        ':rating': movie.rating,
        ':cast_and_crew': movie.castAndCrew,
        ':genre': movie.genre
      }
    }).promise()

    return movie
  }

  async delete (movie: Movie): Promise<void> {
    console.log(movie)
    await this._db.delete({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        movie_pk: movie.id,
        year_sk: movie.year
      }
    }).promise()
  }
}
