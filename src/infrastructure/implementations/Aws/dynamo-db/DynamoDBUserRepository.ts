import { User } from 'domain/entities/User'
import { UserRepository } from 'domain/repositories/UserRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance()

  async save (user: User): Promise<any> {
    await this._db.put({
      TableName: DynamoDB.USER_TABLE_NAME,
      Item: {
        email_pk: user.email,
        token_sk: user.token,
        password: user.password,
        id: user.id
      }
    }).promise()
    return user
  }

  async login (user: User): Promise<any> { return '' }

  async logout (user: User): Promise<any> { return '' }

  async getByEmail (email: string): Promise<any> {
    const response = await this._db.scan({
      TableName: DynamoDB.USER_TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'email_pk'
      },
      ExpressionAttributeValues: {
        ':pk': email
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const id: string = item.id ?? ''
    const emailItem: string = item.email_pk ?? ''
    const token: string = item.token_sk ?? ''

    const user = {
      id,
      email: emailItem,
      token
    }

    return user
  }

  async update (user: User): Promise<any> { return '' }
}
