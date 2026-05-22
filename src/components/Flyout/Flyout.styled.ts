import styled from 'styled-components';

export const StyledFlyout = styled.div`
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  padding: 12px;

  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};

  border-top: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
`;

export const StyledFlyoutButton = styled.button`
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
