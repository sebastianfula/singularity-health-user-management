import { ApolloClient } from '@apollo/client';
import { CHECK_USER_EXISTS } from '../graphql/queries';

export interface CheckUserExistsResponse {
  exists: boolean;
  field: string;
  message: string;
}

export class UserService {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  /**
   * Verifica si un usuario ya existe en el sistema
   * @param username Nombre de usuario a verificar
   * @param email Correo electrónico a verificar
   * @param document Número de documento a verificar
   * @returns Promesa con la respuesta de verificación
   */
  async checkUserExists(username: string, email: string, document: string): Promise<CheckUserExistsResponse> {
    try {
      const { data } = await this.client.query({
        query: CHECK_USER_EXISTS,
        variables: { username, email, document },
        fetchPolicy: 'network-only' // No usar caché para esta consulta
      });

      if (data.checkUserExists.exists) {
        return {
          exists: true,
          field: data.checkUserExists.field,
          message: data.checkUserExists.message
        };
      }

      return {
        exists: false,
        field: '',
        message: ''
      };
    } catch (error) {
      console.error('Error al verificar usuario existente:', error);
      throw error;
    }
  }
}