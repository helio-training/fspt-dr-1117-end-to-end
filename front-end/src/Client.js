import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient, { HttpLink } from 'apollo-client-preset'
import CarsApi from './CarsApi'

const cache = new InMemoryCache();

const client = new ApolloClient({
 link: new HttpLink({ uri: CarsApi.graphQL }),
 cache
});

export default client

