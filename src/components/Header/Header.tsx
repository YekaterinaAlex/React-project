import { StyledHeader, StyledNav, StyledLink } from './Header.styled';

function Header() {
  return (
    <StyledHeader>
      <StyledNav>
        <StyledLink to="/">Home</StyledLink>

        <StyledLink to="/about">About</StyledLink>
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
