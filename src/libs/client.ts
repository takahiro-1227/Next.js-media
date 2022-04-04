import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/post`,
  cache: new InMemoryCache()
})

export default client;
