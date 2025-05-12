import { ApolloClient } from '@apollo/client';
import { UserService } from './userService';

/**
 * Factory para la creación centralizada de servicios
 * Facilita la gestión de dependencias y el testing
 */
export class ServiceFactory {
  private static instance: ServiceFactory;
  private apolloClient: ApolloClient<any>;
  
  // Servicios
  private userService: UserService | null = null;

  private constructor(apolloClient: ApolloClient<any>) {
    this.apolloClient = apolloClient;
  }

  /**
   * Obtiene la instancia única del ServiceFactory (Singleton)
   */
  public static getInstance(apolloClient: ApolloClient<any>): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory(apolloClient);
    }
    return ServiceFactory.instance;
  }

  /**
   * Obtiene el servicio de usuarios
   */
  public getUserService(): UserService {
    if (!this.userService) {
      this.userService = new UserService(this.apolloClient);
    }
    return this.userService;
  }

  /**
   * Reinicia todos los servicios (útil para testing)
   */
  public resetServices(): void {
    this.userService = null;
  }
}