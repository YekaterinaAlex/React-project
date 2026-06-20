import { StyledAboutPage, StyledLink } from '../../app/about/About.styled';

function About() {
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
export default About;
