import styled from 'styled-components';

export const StyledPagination = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  background: var(--button-background);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 6px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    background: var(--buttonhover-background);
  }
`;
