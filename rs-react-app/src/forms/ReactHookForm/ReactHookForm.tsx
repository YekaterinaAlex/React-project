import { useForm, useWatch } from 'react-hook-form';

import { useAppSelector } from '../../store/hooks';
import { createFormSchema, type FormValues } from '../../validation/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPasswordStrength } from '../../validation/passwordStrength';

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
  StyledPasswordRow,
  StyledPasswordRule,
  StyledPasswordRules,
} from '../UncontrolledForm/UncontrolledForm.styled';

function ReactHookForm() {
  const countries = useAppSelector((state) => state.forms.countries);
  const formSchema = createFormSchema(countries);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      gender: undefined,
      termsAccepted: false,
      password: '',
      confirmPassword: '',
      country: '',
    },
  });

  const passwordValue =
    useWatch({
      control,
      name: 'password',
    }) ?? '';
  const passwordStrength = getPasswordStrength(passwordValue);

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
          {...register('age', {
            setValueAs: (value) => (value === '' ? NaN : Number(value)),
          })}
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
      <StyledPasswordRow>
        <StyledField>
          <StyledLabel htmlFor="rhf-password">Password</StyledLabel>
          <StyledInput
            id="rhf-password"
            type="password"
            {...register('password')}
          />
          <StyledPasswordRules>
            <StyledPasswordRule $isValid={passwordStrength.hasNumber}>
              1 number
            </StyledPasswordRule>

            <StyledPasswordRule $isValid={passwordStrength.hasUpperCase}>
              1 uppercase
            </StyledPasswordRule>

            <StyledPasswordRule $isValid={passwordStrength.hasLowerCase}>
              1 lowercase
            </StyledPasswordRule>

            <StyledPasswordRule $isValid={passwordStrength.hasSpecialCharacter}>
              1 special character
            </StyledPasswordRule>
          </StyledPasswordRules>
          <StyledError>{errors.password?.message ?? ''}</StyledError>
        </StyledField>
        <StyledField>
          <StyledLabel htmlFor="rhf-confirmPassword">
            Confirm Password
          </StyledLabel>
          <StyledInput
            id="rhf-confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <StyledError>{errors.confirmPassword?.message ?? ''}</StyledError>
        </StyledField>
      </StyledPasswordRow>
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
