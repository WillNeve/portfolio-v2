import styles from './about.module.scss';
import styled from 'styled-components';
import { hexToRgba } from '@/app/config/utilities';
import TimeLine from './timeline';

const AboutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  p {
    color: ${props => hexToRgba(props.theme.foregroundWhite, 0.9)};
  }
`;

const About = () => {
  return (
    <>

      <AboutContainer>
        <div>
          <h1>About me.</h1>
          <h2>Heres a bit more about me</h2>
        </div>
        <TimeLine/>
      </AboutContainer>
    </>
  )
}

export default About;
