import { ApolloProvider } from '@apollo/client';
import './App.css';
import RegisterPage from './presentation/pages/RegisterPage';
import { getApolloClient } from './infrastructure/graphql/apolloClient';

// Obtener el cliente Apollo configurado
const client = getApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-800">Singularity Health</h1>
            <p className="text-gray-600">Sistema de Gestión de Usuarios</p>
          </header>
          <RegisterPage />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App
