import { formSchema } from '../../validation/formSchema';

import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';

import {
  StyledField,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledCheckboxWrapper,
  StyledCheckbox,
  StyledSubmitButton,
  StyledError,
} from './UncontrolledForm.styled';

type FormErrors = Partial<
  Record<
    | 'name'
    | 'age'
    | 'email'
    | 'gender'
    | 'termsAccepted'
    | 'password'
    | 'confirmPassword'
    | 'country',
    string
  >
>;

function UncontrolledForm() {
  const [errors, setErrors] = useState<FormErrors>({});

  const countries = useAppSelector((state) => state.forms.countries);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: String(formData.get('name') ?? ''),
      age: Number(formData.get('age')),

      email: String(formData.get('email') ?? ''),
      gender: String(formData.get('gender') ?? ''),
      termsAccepted: formData.get('terms') === 'on',
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
      country: String(formData.get('country') ?? ''),
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FormErrors;

        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    console.log(result.data);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledField>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <StyledInput id="name" name="name" type="text" />
        <StyledError>{errors.name ?? ''}</StyledError>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="age">Age:</StyledLabel>
        <StyledInput id="age" name="age" type="number" />
        <StyledError>{errors.age ?? ''}</StyledError>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput id="email" name="email" type="email" />
        <StyledError>{errors.email ?? ''}</StyledError>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="gender">Gender:</StyledLabel>
        <StyledSelect id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </StyledSelect>
        <StyledError>{errors.gender ?? ''}</StyledError>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput id="password" name="password" type="password" />
        <StyledError>{errors.password ?? ''}</StyledError>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="confirmPassword">Confirm Password</StyledLabel>
        <StyledInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
        />
        <StyledError>{errors.confirmPassword ?? ''}</StyledError>
        <StyledField>
          <StyledLabel htmlFor="country">Country</StyledLabel>
          <StyledInput
            id="country"
            name="country"
            type="text"
            list="countries"
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <StyledError>{errors.country ?? ''}</StyledError>
        </StyledField>
      </StyledField>
      <StyledCheckboxWrapper>
        <StyledCheckbox id="terms" name="terms" type="checkbox" />

        <StyledLabel htmlFor="terms">Accept Terms and Conditions</StyledLabel>
      </StyledCheckboxWrapper>
      <StyledError>{errors.termsAccepted ?? ''}</StyledError>
      <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
    </StyledForm>
  );
}
export default UncontrolledForm;
