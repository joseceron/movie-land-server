import { UserSession } from 'domain/entities/UserSession'
import { UserSessionRepository } from 'domain/repositories/UserSessionRepository'
import { DynamoDB } from '../../../driven-adapters/AWS/dynamo-db'

export class DynamoDBUserSessionRepository implements UserSessionRepository {
  private readonly _db = DynamoDB.getInstance()

  async save (userSession: UserSession): Promise<any> {
    await this._db.put({
      TableName: DynamoDB.USER_SESSIONS_TABLE_NAME,
      Item: {
        email_pk: userSession.email,
        token_sk: userSession.token
      }
    }).promise()
    return userSession
  }

  async get (userSession: UserSession): Promise<any> {
    const response = await this._db.scan({
      TableName: DynamoDB.USER_SESSIONS_TABLE_NAME,
      FilterExpression: '#pk = :pk AND #sk = :sk',
      ExpressionAttributeNames: {
        '#pk': 'email_pk',
        '#sk': 'token_sk'
      },
      ExpressionAttributeValues: {
        ':pk': userSession.email,
        ':sk': userSession.token
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null
    const email: string = item.email_pk ?? ''
    const token: string = item.token_sk ?? ''

    const session = { email, token }

    return session
  }
}
