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
          <StyledLink to="/">Home</StyledLink>

          <StyledLink to="/about">About</StyledLink>
        </StyledLinks>
        <StyledButton onClick={toggleTheme}> {theme}</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
