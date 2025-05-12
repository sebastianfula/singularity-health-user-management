import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Configuración de la URL del servidor GraphQL
const API_URL = 'http://localhost:4000/graphql';

// Crear el link HTTP para las peticiones
const httpLink = new HttpLink({
  uri: API_URL
});

// Manejador de errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[Error GraphQL]: Mensaje: ${message}, Ubicación: ${locations}, Ruta: ${path}`
      );
    });
  }
  
  if (networkError) {
    console.error(`[Error de Red]: ${networkError}`);
  }
});

// Crear y exportar el cliente Apollo
export const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  });
};

// Cliente Apollo singleton
let apolloClient: ApolloClient<any>;

// Obtener el cliente Apollo (singleton)
export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};