import { hexToRgba } from '@/app/config/utilities';
import styled from 'styled-components';

const SkillsWrapper = styled.div`
  position: relative;
  padding: 20px 0px;
  max-width: 750px;
  font-family: 'Montserrat', sans-serif;
  /* border: 2px solid ${props => hexToRgba(props.theme.foregroundWhite, 1)}; */
  h2 {
    color: ${props => props.theme.hackerGreen};
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
      content: '';
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(calc(-100% - 6px), -50%);
      width: 5px;
      height: 1px;
      background: ${props => props.theme.foregroundWhite};
      opacity: 0.9;
    }
  }
  .soft, .technical {
    justify-content: space-between;
  }
  .container {
    margin-top: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > div {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }
    @media (min-width: 1000px) {
      flex-direction: row;
      justify-content: space-between;
      & > div {
        width: 50%;
      }
    }
  }
`;

const Skills = () => {
  return (
    <SkillsWrapper>
      <h2>Skills</h2>
      <div className="container">
        <div className="technical">
          <div>
            <h3>Front-End</h3>
            <ul>
              <li>TypeScript</li>
              <li>React.js</li>
              <li>Next.js</li>
              <li>CSS3/SASS</li>
              <li>Tailwind</li>
              <li>HTML5</li>
            </ul>
          </div>
          <div>
            <h3>Back-End</h3>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>Ruby on Rails</li>
              <li>SQL</li>
              <li>Postgres</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div>
            <h3>Tools and Technologies</h3>
            <ul>
              <li>Git</li>
              <li>Github</li>
              <li>Docker</li>
              <li>Figma</li>
              <li>Unix</li>
            </ul>
          </div>
        </div>

        <div className="soft">
          <div>
            <h3>Soft Skills</h3>
            <ul>
              <li>Agile Development</li>
              <li>Project Management</li>
              <li>Adaptability</li>
              <li>Critical Thinking</li>
              <li>Client Communication</li>
              <li>Teaching</li>
              <li>Mentorship</li>
            </ul>
          </div>
        </div>
      </div>
    </SkillsWrapper>
  )
}

export default Skills;
