import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TYPE_DOCUMENTS, GET_COUNTRIES } from '../../infrastructure/graphql/queries';
import type { TypeDocument, Country } from '../../domain/models/User';
import { useRegisterForm } from '../../application/hooks/useRegisterForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Spinner from '../components/ui/Spinner';
import Notification from '../components/ui/Notification';
import DatePicker from '../components/ui/DatePicker';
import Checkbox from '../components/ui/Checkbox';
import FormSection from '../components/ui/FormSection';
import FormGroup from '../components/ui/FormGroup';

const RegisterPage: React.FC = () => {
  // Usar el hook personalizado para la lógica del formulario
  const {
    formData,
    errors,
    responseMessage,
    loading,
    handleChange,
    handleSubmit,
    resetForm
  } = useRegisterForm();

  // Consultas GraphQL
  const { data: typeDocumentsData } = useQuery(GET_TYPE_DOCUMENTS);
  const { data: countriesData } = useQuery(GET_COUNTRIES);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Registro de Usuario</h1>
      
      {responseMessage && (
        <Notification 
          type={responseMessage.type} 
          message={responseMessage.text} 
          onClose={() => resetForm()} 
          autoClose={responseMessage.type === 'success'}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información personal */}
        <FormSection title="Información Personal">
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              label="Apellidos"
              required
              error={errors.lastName}
            />
            
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Nombres"
              required
              error={errors.name}
            />
            
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Correo Electrónico"
              required
              error={errors.email}
            />
            
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              label="Nombre de Usuario"
              required
              error={errors.username}
            />
            
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Contraseña"
              required
              error={errors.password}
            />
            
            <FormGroup className="flex items-center space-x-4">
              <Checkbox
                name="isMilitar"
                checked={formData.isMilitar}
                onChange={handleChange}
                label="Es Militar"
              />
              
              <Checkbox
                name="isTemporal"
                checked={formData.isTemporal}
                onChange={handleChange}
                label="Es Temporal"
              />
            </FormGroup>
          </FormSection>
        
        {/* Información de documento */}
        <FormSection title="Información de Documento">
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name="document.typeDocumentId"
              value={formData.document.typeDocumentId}
              onChange={handleChange}
              label="Tipo de Documento"
              required
              options={typeDocumentsData?.getTypeDocuments.map((type: TypeDocument) => ({
                value: type.id,
                label: type.nameTypeDocument
              })) || []}
              placeholder="Seleccione un tipo"
              error={errors['document.typeDocumentId']}
            />
            
            <Input
              type="text"
              name="document.document"
              value={formData.document.document}
              onChange={handleChange}
              label="Número de Documento"
              required
              error={errors['document.document']}
            />
          </FormGroup>
          
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="document.placeExpedition"
              value={formData.document.placeExpedition || ''}
              onChange={handleChange}
              label="Lugar de Expedición"
            />
            
            <DatePicker
              name="document.dateExpedition"
              value={formData.document.dateExpedition || ''}
              onChange={handleChange}
              label="Fecha de Expedición"
              error={errors['document.dateExpedition']}
            />
          </FormGroup>
        </FormSection>
        
        {/* Información de contacto */}
        <FormSection title="Información de Contacto">
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name="contactInfo.countryId"
              value={formData.contactInfo.countryId}
              onChange={handleChange}
              label="País"
              required
              options={countriesData?.getCountries.map((country: Country) => ({
                value: country.id,
                label: country.countryName
              })) || []}
              placeholder="Seleccione un país"
              error={errors['contactInfo.countryId']}
            />
            
            <Input
              type="text"
              name="contactInfo.city"
              value={formData.contactInfo.city || ''}
              onChange={handleChange}
              label="Ciudad"
            />
          </FormGroup>
          
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="contactInfo.address"
              value={formData.contactInfo.address || ''}
              onChange={handleChange}
              label="Dirección"
            />
            
            <Input
              type="tel"
              name="contactInfo.phone"
              value={formData.contactInfo.phone || ''}
              onChange={handleChange}
              label="Teléfono"
            />
          </FormGroup>
          
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="tel"
              name="contactInfo.celPhone"
              value={formData.contactInfo.celPhone || ''}
              onChange={handleChange}
              label="Celular"
            />
            
            <Input
              type="text"
              name="contactInfo.emergencyName"
              value={formData.contactInfo.emergencyName || ''}
              onChange={handleChange}
              label="Nombre de Contacto de Emergencia"
            />
          </FormGroup>
          
          <FormGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="tel"
              name="contactInfo.emergencyPhone"
              value={formData.contactInfo.emergencyPhone || ''}
              onChange={handleChange}
              label="Teléfono de Emergencia"
            />
          </FormGroup>
        </FormSection>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600">
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center justify-center space-x-2">
            {loading && <Spinner size="small" color="white" />}
            <span>{loading ? 'Registrando...' : 'Registrar Usuario'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;