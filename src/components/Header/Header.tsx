'use client';

import {
  StyledHeader,
  StyledNav,
  StyledLinks,
  StyledLink,
  StyledButton,
} from './Header.styled';
import { useTheme } from '../../context/useTheme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledHeader>
      <StyledNav>
        <StyledLinks>
          <StyledLink href="/">Home</StyledLink>
          <StyledLink href="/about">About</StyledLink>
        </StyledLinks>

        <StyledButton onClick={toggleTheme}>{theme}</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
