import { Genre } from 'domain/entities/Genre'
import { GenreRepository } from 'domain/repositories/GenreRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBGenreRepository implements GenreRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<Genre[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.GENRE_TABLE_NAME
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const genres = items.map((item: any) => {
      const id = item.id_pk ?? ''
      const name: string = item.name_sk ?? ''

      return {
        id,
        name
      }
    })

    return genres
  }
}
