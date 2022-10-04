import AWS from '../aws'

export class DynamoDB {
  // static TABLE_NAME: string = 'movie-land'
  static TABLE_NAME: string = 'movie'
  static GENRE_TABLE_NAME = 'genre'
  private static _INSTANCE: AWS.DynamoDB.DocumentClient
  // private static _INSTANCE: any

  // static getInstance (options?: AWS.DynamoDB.ClientConfiguration): AWS.DynamoDB {
  //   if (this._INSTANCE === undefined) {
  //     this._INSTANCE = new AWS.DynamoDB(options)
  //   }

  //   return this._INSTANCE
  // }

  static getInstance (options?: AWS.DynamoDB.ClientConfiguration): AWS.DynamoDB.DocumentClient {
    if (this._INSTANCE === undefined) {
      // this._INSTANCE = new AWS.DynamoDB(options)
      this._INSTANCE = new AWS.DynamoDB.DocumentClient(options)
      // this._INSTANCE = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
    }

    return this._INSTANCE
  }
}
