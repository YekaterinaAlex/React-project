import { Controller, useForm, useWatch } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addSubmission } from '../../store/formsSlice';
import { imageToBase64 } from '../../utils/imageToBase64';
import { createFormSchema, type FormValues } from '../../validation/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPasswordStrength } from '../../validation/passwordStrength';
import type { ReactHookFormProps } from './reactHookForm.types';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
  StyledPasswordInputWrapper,
  StyledPasswordToggleButton,
} from '../UncontrolledForm/UncontrolledForm.styled';

function ReactHookForm({ onSuccess }: ReactHookFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const countries = useAppSelector((state) => state.forms.countries);
  const formSchema = createFormSchema(countries);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
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

  const onSubmit = async (data: FormValues) => {
    const imageBase64 = await imageToBase64(data.image);
    const createdAt = new Date().getTime();

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        termsAccepted: data.termsAccepted,
        country: data.country,
        password: data.password,
        imageBase64,
        createdAt,
        isNew: true,
      })
    );
    reset();
    onSuccess();
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
      <StyledField>
        <StyledLabel htmlFor="rhf-country">Country</StyledLabel>

        <StyledInput
          id="rhf-country"
          list="rhf-countries"
          {...register('country')}
        />

        <datalist id="rhf-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        <StyledError>{errors.country?.message ?? ''}</StyledError>
      </StyledField>
      <StyledPasswordRow>
        <StyledField>
          <StyledLabel htmlFor="rhf-password">Password</StyledLabel>
          <StyledPasswordInputWrapper>
            <StyledInput
              id="rhf-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />

            <StyledPasswordToggleButton
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </StyledPasswordToggleButton>
          </StyledPasswordInputWrapper>
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
          <StyledPasswordInputWrapper>
            <StyledInput
              id="rhf-confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            />

            <StyledPasswordToggleButton
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </StyledPasswordToggleButton>
          </StyledPasswordInputWrapper>
          <StyledError>{errors.confirmPassword?.message ?? ''}</StyledError>
        </StyledField>
      </StyledPasswordRow>
      <StyledField>
        <StyledLabel htmlFor="rhf-image">Profile Image</StyledLabel>

        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <StyledInput
              id="rhf-image"
              type="file"
              accept="image/png, image/jpeg"
              ref={ref}
              onChange={(event) => {
                onChange(event.target.files?.[0]);
              }}
            />
          )}
        />

        <StyledError>{errors.image?.message ?? ''}</StyledError>
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
