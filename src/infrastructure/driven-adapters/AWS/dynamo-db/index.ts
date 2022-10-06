import AWS from '../aws'

export class DynamoDB {
  static TABLE_NAME: string = 'movie'
  static GENRE_TABLE_NAME = 'genre'
  static USER_TABLE_NAME = 'user'
  static USER_SESSIONS_TABLE_NAME = 'user-sessions'

  private static _INSTANCE: AWS.DynamoDB.DocumentClient

  static getInstance (options?: AWS.DynamoDB.ClientConfiguration): AWS.DynamoDB.DocumentClient {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new AWS.DynamoDB.DocumentClient(options)
    }

    return this._INSTANCE
  }
}
