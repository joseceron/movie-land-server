import { User } from 'domain/entities/User'
import { UserSession } from 'domain/entities/UserSession'

import { UserRepository } from 'domain/repositories/UserRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance()

  async save (user: User, userSession: UserSession): Promise<any> {
    await this._db.batchWrite({
      RequestItems: {
        [DynamoDB.USER_TABLE_NAME]: [{
          PutRequest: {
            Item: {
              id_pk: user.id,
              email_sk: user.email,
              password: user.password
            }
          }
        }],
        [DynamoDB.USER_SESSIONS_TABLE_NAME]: [{
          PutRequest: {
            Item: {
              email_pk: userSession.email,
              token_sk: userSession.token
            }
          }
        }]
      }
    }).promise()

    const response = {
      id: user.id,
      email: user.email,
      password: user.password,
      token: userSession.token
    }
    return response
  }

  async login (user: User): Promise<any> { return '' }

  async logout (user: User): Promise<any> { return '' }

  async getByEmail (email: string): Promise<any> {
    const response = await this._db.scan({
      TableName: DynamoDB.USER_TABLE_NAME,
      FilterExpression: '#sk = :sk',
      ExpressionAttributeNames: {
        '#sk': 'email_sk'
      },
      ExpressionAttributeValues: {
        ':sk': email
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const id: string = item.id_pk ?? ''
    const emailItem: string = item.email_sk ?? ''
    const password: string = item.password ?? ''

    const user = {
      id,
      email: emailItem,
      password
    }

    return user
  }

  async getByCredentials (email: string, password: string): Promise<any> {
    const response = await this._db.scan({
      TableName: DynamoDB.USER_TABLE_NAME,
      FilterExpression: '#sk = :sk AND #p = :p',
      ExpressionAttributeNames: {
        '#sk': 'email_sk',
        '#p': 'password'
      },
      ExpressionAttributeValues: {
        ':sk': email,
        ':p': password
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const id: string = item.id_pk ?? ''
    const emailItem: string = item.email_sk ?? ''

    const user = {
      id,
      email: emailItem
    }

    return user
  }

  async update (user: User): Promise<any> { return '' }
}
