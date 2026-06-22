import { StyledAboutPage, StyledLink } from './About.styled';

export default function AboutPage() {
  return (
    <StyledAboutPage>
      <h1>About page</h1>

      <p>Author: Yekaterina Alexeyenko</p>

      <StyledLink
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </StyledLink>
    </StyledAboutPage>
  );
}
