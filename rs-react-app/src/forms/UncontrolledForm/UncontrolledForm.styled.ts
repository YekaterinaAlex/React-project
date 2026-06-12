import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledLabel = styled.label`
  font-weight: 600;
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 40px 8px 12px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 16px;
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const StyledSubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;

  background: #1976d2;
  color: white;

  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledError = styled.p`
  height: 18px;
  margin: 0;
  color: #d32f2f;
  font-size: 14px;
  line-height: 18px;
`;

export const StyledPasswordRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const StyledPasswordRules = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const StyledPasswordRule = styled.li<{ $isValid: boolean }>`
  color: ${({ $isValid }) => ($isValid ? 'green' : '#d32f2f')};
  font-size: 14px;
  font-weight: 500;
`;

export const StyledPasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledPasswordToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;

  transform: translateY(-50%);

  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  color: #666;
  cursor: pointer;
`;
