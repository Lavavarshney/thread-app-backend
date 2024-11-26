import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

// HTTP Link for queries and mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
});

// Log the authToken for debugging
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMWJkNGZiLTkwYjMtNDMzNy05MThkLTc3MTUwMTRlZDc0ZiIsImVtYWlsIjoibGF2YUBnbWFpbC5jb20iLCJpYXQiOjE3MzI0MzI0OTN9.qX_7F5mIFvmwrTBkke-Z0tk-87i8sMpOrBqloVx_1Qs';
console.log('Auth Token:', authToken); // Log the token for debugging

// Create a GraphQL-ws client
const wsClient = createClient({
  url: 'ws://localhost:8000/graphql', // WebSocket endpoint
  connectionParams: {
    token: authToken, // Pass the token in connectionParams
  },
  on: {
    connected: () => console.log('Connected to the WebSocket server'),
    error: (error) => console.error('WebSocket connection error:', error),
    closed: () => console.log('WebSocket connection closed'),
  },
});

// WebSocket Link for subscriptions
const wsLink = new GraphQLWsLink(wsClient);

// Split link to route queries/mutations via HTTP and subscriptions via WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
