import styled from 'styled-components';

export const StyledSearchContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};

  background-color: ${({ theme }) => theme.inputBackground};

  color: ${({ theme }) => theme.text};

  outline: none;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.buttonBackground};
  }
`;

export const StyledSearchButton = styled.button`
  padding: 8px 14px;

  border: none;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.buttonBackground};

  color: ${({ theme }) => theme.text};

  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};
  }
`;
