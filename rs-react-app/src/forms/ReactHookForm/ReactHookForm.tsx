import { useForm } from 'react-hook-form';

import { useAppSelector } from '../../store/hooks';
import { createFormSchema, type FormValues } from '../../validation/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  StyledForm,
  StyledField,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledCheckboxWrapper,
  StyledCheckbox,
  StyledSubmitButton,
  StyledError,
} from '../UncontrolledForm/UncontrolledForm.styled';

function ReactHookForm() {
  const countries = useAppSelector((state) => state.forms.countries);
  const formSchema = createFormSchema(countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledField>
        <StyledLabel htmlFor="rhf-name">Name</StyledLabel>
        <StyledInput id="rhf-name" {...register('name')} />
        <StyledError>{errors.name?.message ?? ''}</StyledError>
      </StyledField>

      <StyledField>
        <StyledLabel htmlFor="rhf-age">Age</StyledLabel>
        <StyledInput
          id="rhf-age"
          type="number"
          {...register('age', { valueAsNumber: true })}
        />
        <StyledError>{errors.age?.message ?? ''}</StyledError>
      </StyledField>

      <StyledField>
        <StyledLabel htmlFor="rhf-email">Email</StyledLabel>
        <StyledInput id="rhf-email" type="email" {...register('email')} />
        <StyledError>{errors.email?.message ?? ''}</StyledError>
      </StyledField>

      <StyledField>
        <StyledLabel htmlFor="rhf-gender">Gender</StyledLabel>
        <StyledSelect id="rhf-gender" {...register('gender')}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </StyledSelect>
        <StyledError>{errors.gender?.message ?? ''}</StyledError>
      </StyledField>

      <StyledCheckboxWrapper>
        <StyledCheckbox
          id="rhf-terms"
          type="checkbox"
          {...register('termsAccepted')}
        />
        <StyledLabel htmlFor="rhf-terms">
          Accept Terms and Conditions
        </StyledLabel>
      </StyledCheckboxWrapper>

      <StyledError>{errors.termsAccepted?.message ?? ''}</StyledError>

      <StyledSubmitButton type="submit" disabled={!isValid}>
        Submit
      </StyledSubmitButton>
    </StyledForm>
  );
}
export default ReactHookForm;
