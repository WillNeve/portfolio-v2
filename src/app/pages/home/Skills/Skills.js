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
          <h3>Languages</h3>
          <ul>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>Ruby</li>
          </ul>
        </div>
        <div>
          <h3>Frameworks/SDKs</h3>
          <ul>
            <li>React</li>
            <li>Remix</li>
            <li>Firebase</li>
            <li>Next</li>
            <li>Vue</li>
            <li>Ruby on Rails</li>
          </ul>
        </div>
        <div>
          <h3>Back End / Databases</h3>
          <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>Postgres</li>
            <li>Firestore</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div>
          <h3>Tools and Technologies</h3>
          <ul>
            <li>Git</li>
            <li>Github</li>
            <li>Prisma</li>
            <li>Tailwind</li>
            <li>Unix Systems</li>
            <li>Bash | Shell Scripting</li>
            <li>Google Cloud</li>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>NPM</li>
            <li>Webpack</li>
            <li>Figma</li>
          </ul>
        </div>
        <div>
          <h3>Extras</h3>
          <ul>
            <li>Teaching | Mentorship</li>
            <li>Product Management</li>
            <li>System Design</li>
            <li>UX/UI</li>
          </ul>
        </div>
      </div>
    </SkillsWrapper>
  );
};

export default Skills;
