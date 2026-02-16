import { hexToRgba } from "@/app/config/utilities";
import styled from "styled-components";

const SkillsWrapper = styled.div`
  position: relative;
  font-family: "Montserrat", sans-serif;
  /* border: 2px solid ${(props) =>
    hexToRgba(props.theme.foregroundWhite, 1)}; */
  h2 {
    color: ${(props) => props.theme.hackerGreen};
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    row-gap: 5px;
    list-style-type: none;
  }
  li {
    position: relative;
    font-size: 18px;
    font-weight: 200;
    margin-left: 21px;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(calc(-100% - 6px), -50%);
      width: 5px;
      height: 1px;
      background: ${(props) => props.theme.foregroundWhite};
      opacity: 0.9;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 20px;
    padding: 5px;
    gap: 20px;
    & > div {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
    }
    @media (min-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  padding-bottom: 20px;
`;

const Skills = () => {
  return (
    <SkillsWrapper>
      <h2>Skills</h2>
      <div className="container">
        <div>
          <h3>Languages & Fundamentals</h3>
          <ul>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>HTML5 / SEO</li>
            <li>CSS3 / Tailwind</li>
            <li>SQL</li>
            <li>Ruby</li>
            <li>Bash</li>
            <li>Python</li>
          </ul>
        </div>
        <div>
          <h3>Frameworks / SDKs</h3>
          <ul>
            <li>React.js</li>
            <li>React-Router / Remix</li>
            <li>Next.js</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>Vue.js</li>
            <li>Ruby on Rails</li>
          </ul>
        </div>
        <div>
          <h3>Back End / Databases</h3>
          <ul>
            <li>PostgreSQL</li>
            <li>Firestore</li>
            <li>REST / API Design</li>
            <li>Serverless</li>
            <li>Express.js</li>
            <li>Prisma</li>
          </ul>
        </div>
        <div>
          <h3>Tools & Infrastructure</h3>
          <ul>
            <li>Git</li>
            <li>Unix / Bash</li>
            <li>Docker</li>
            <li>GCP</li>
            <li>CI/CD</li>
            <li>Sentry</li>
            <li>Figma</li>
            <li>Posthog</li>
          </ul>
        </div>
        <div>
          <h3>Practices & Paradigms</h3>
          <ul>
            <li>Functional Programming</li>
            <li>Object-Oriented Programming (OOP)</li>
            <li>Test-Driven Development (TDD/BDD)</li>
            <li>UX/UI Design</li>
            <li>DSA</li>
          </ul>
        </div>
        <div>
          <h3>Growth & Product</h3>
          <ul>
            <li>Experimentation</li>
            <li>Hypothesis Development</li>
            <li>Data Analysis</li>
            <li>Product Analytics</li>
            <li>SEO</li>
            <li>A/B Testing</li>
          </ul>
        </div>
      </div>
    </SkillsWrapper>
  );
};

export default Skills;
