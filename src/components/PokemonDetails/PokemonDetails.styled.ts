import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 16px;
`;

export const StyledTitle = styled.h2`
  margin-bottom: 12px;
`;

export const StyledText = styled.p`
  margin-bottom: 8px;
`;

export const StyledRefreshButton = styled.button`
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
