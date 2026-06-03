import {
  StyledField,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledCheckboxWrapper,
  StyledCheckbox,
  StyledSubmitButton,
} from './UncontrolledForm.styled';

function UncontrolledForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: String(formData.get('name') ?? ''),
      age: Number(formData.get('age')),
      email: String(formData.get('email') ?? ''),
      gender: String(formData.get('gender') ?? ''),
      termsAccepted: formData.get('terms') === 'on',
    };

    console.log(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledField>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <StyledInput id="name" name="name" type="text" />
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="age">Age:</StyledLabel>
        <StyledInput id="age" name="age" type="number" />
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="email">Email:</StyledLabel>
        <StyledInput id="email" name="email" type="email" />
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="gender">Gender:</StyledLabel>
        <StyledSelect id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </StyledSelect>
      </StyledField>
      <StyledCheckboxWrapper>
        <StyledCheckbox id="terms" name="terms" type="checkbox" />

        <StyledLabel htmlFor="terms">Accept Terms and Conditions</StyledLabel>
      </StyledCheckboxWrapper>
      <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
    </StyledForm>
  );
}
export default UncontrolledForm;
