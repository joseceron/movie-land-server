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
}
