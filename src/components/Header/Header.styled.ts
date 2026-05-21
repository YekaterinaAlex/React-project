import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background: #111827;
  padding: 12px 20px;
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 16px;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledButton = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: var(--button-background);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--buttonhover-background);
  }
`;
