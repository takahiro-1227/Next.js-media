import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: `/api/post`,
  cache: new InMemoryCache()
})

export default client;
