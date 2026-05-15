import { StyledNotFound, StyledTitle, StyledLink } from './NotFound.styled';

function NotFound() {
  return (
    <StyledNotFound>
      <StyledTitle>404</StyledTitle>

      <p>Page not found</p>

      <StyledLink to="/">Go back</StyledLink>
    </StyledNotFound>
  );
}
export default NotFound;
