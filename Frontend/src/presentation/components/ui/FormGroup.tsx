import React from 'react';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className = '',
  fullWidth = false,
}) => {
  return (
    <div className={`${fullWidth ? 'col-span-2' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default FormGroup;