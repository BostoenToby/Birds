import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import useAuthentication from './useAuthentication'
import { setContext } from '@apollo/client/link/context'

export default () => {
  const { user } = useAuthentication()
  const cache = new InMemoryCache()

  const httpLink = createHttpLink({
    uri: 'http://[::1]:3003/graphql',
    credentials: 'same-origin', //zorgt ervoor dat alles wat er van credentials meegesluist word met hetgeen dat er al is
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await user.value?.getIdToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const apolloClient = new ApolloClient({
    cache,
    link: authLink.concat(httpLink)
  })
  return {
    apolloClient,
  }
}
