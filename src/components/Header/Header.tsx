import {
  StyledHeader,
  StyledNav,
  StyledLink,
  StyledButton,
} from './Header.styled';
import { useTheme } from '../../context/useTheme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledHeader>
      <StyledNav>
        <StyledLink to="/">Home</StyledLink>

        <StyledLink to="/about">About</StyledLink>
        <StyledButton onClick={toggleTheme}>Theme: {theme}</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
