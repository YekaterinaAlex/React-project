import styled from 'styled-components';

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 32px;
`;

export const StyledButton = styled.button`
  padding: 12px 20px;

  border: none;
  border-radius: 8px;

  cursor: pointer;

  font-size: 16px;
  font-weight: 600;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
