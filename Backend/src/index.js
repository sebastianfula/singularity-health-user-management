require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./interfaces/graphql/schema');
const { resolvers } = require('./interfaces/graphql/resolvers');
const { sequelize } = require('./infrastructure/database/config');

async function startServer() {
  // Inicializar Express
  const app = express();
  
  // Configurar Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Aquí se puede agregar lógica para el contexto, como autenticación
      return { req };
    },
  });
  
  await server.start();
  server.applyMiddleware({ app });
  
  // Conectar a la base de datos MySQL
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos MySQL establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
  
  // Iniciar el servidor
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error('Error al iniciar el servidor:', err);
});