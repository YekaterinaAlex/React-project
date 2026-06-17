import type { InputHTMLAttributes, ReactNode } from 'react';

import {
  StyledField,
  StyledLabel,
  StyledInput,
  StyledError,
} from '../../forms/UncontrolledForm/UncontrolledForm.styled';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  children?: ReactNode;
};

export function Input({ label, error, children, id, ...props }: InputProps) {
  return (
    <StyledField>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput id={id} {...props} />
      {children}
      <StyledError>{error ?? ''}</StyledError>
    </StyledField>
  );
}
