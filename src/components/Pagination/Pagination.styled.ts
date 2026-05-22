import styled from 'styled-components';

export const StyledPagination = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;

  border: 1px solid ${({ theme }) => theme.border};

  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
