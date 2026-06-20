import styled from 'styled-components';
import { Link } from '../../i18n/navigation';

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 12px 20px;
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

export const StyledButton = styled.button`
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
