import { movieMutations, movieQueries } from './movie'

const resolvers = {
  Query: {
    ...movieQueries
  },
  Mutation: {
    ...movieMutations
  }
}

export default resolvers
