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
  padding: 8px 12px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 16px;
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

  cursor: pointer;

  font-size: 16px;
`;

export const StyledError = styled.p`
  height: 18px;
  margin: 0;
  color: #d32f2f;
  font-size: 14px;
  line-height: 18px;
`;
