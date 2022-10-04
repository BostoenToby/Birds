import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    cache,
    uri: 'http://[::1]:3003/graphql',
  })

export default () => {
      return {
        apolloClient
      }
}