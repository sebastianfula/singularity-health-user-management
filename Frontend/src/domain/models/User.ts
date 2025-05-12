// Modelos de dominio para la aplicación

export interface User {
  id?: string;
  lastName: string;
  name: string;
  isMilitar: boolean;
  username: string;
  email: string;
  document: UserDocument;
  contactInfo: ContactInfo;
}

export interface UserDocument {
  document: string;
  typeDocumentId: string;
  placeExpedition?: string;
  dateExpedition?: string;
}

export interface ContactInfo {
  address?: string;
  countryId: string;
  city?: string;
  phone?: string;
  celPhone?: string;
  emergencyName?: string;
  emergencyPhone?: string;
}

export interface TypeDocument {
  id: string;
  nameTypeDocument: string;
}

export interface Country {
  id: string;
  countryName: string;
  countryCode?: string;
}

export interface RegisterUserInput {
  lastName: string;
  name: string;
  isMilitar: boolean;
  isTemporal: boolean;
  username: string;
  password: string;
  email: string;
  document: UserDocument;
  contactInfo: ContactInfo;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: User;
}