import styled, {keyframes} from "styled-components";
import Image from 'next/image';
import { hexToRgba } from "@/app/config/utilities";
import { ButtonIcon } from "@/app/components/Styles/Buttons";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";


const loadingAnim = keyframes`
  0% {
    background-position: -1000px;
  }
  100% {
    background-position: 1000px;
  }
`;

const LoadingCardWrapper = styled.div`
  & > div {
    width: 300px;
    height: 200px;
    background-color: rgba(81,226,81,0.1);
    
  }
  .animated {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(5,7,8,0) 40%, rgba(81,226,81,0.2) 55%, rgba(81,226,81,0.2) 66%, rgba(5,7,8,0) 82%);
    background-size: 1000px 70px;
    /* border: 1px dashed purple; */
    animation: ${loadingAnim} 2s linear 0s infinite forwards;
  }
`;

export const LoadingCard = () => {
  return (
    <LoadingCardWrapper>
      <div>
        <div className="animated"></div>
      </div>
    </LoadingCardWrapper>
  );
}


const ProjectCardWrapper = styled.div`
  border: 1px dashed yellow;
  display: flex;
  width: 80%;
  min-width: 310px;
  max-width: 475px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid ${props => props.theme.foregroundWhite};
  .top {
    display: flex;
    padding: 10px;
    align-items: start;
    column-gap: 10px;
  }
  .links {
    display: flex;
    height: fit-content;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      width: 30px;
    }
  }

  h3 {
    font-size: 26px;
    color: ${props => props.theme.hackerGreen};
    margin-bottom: 5px;
  }
  ul {
    display: flex;
    column-gap: 10px;
    flex-wrap: wrap;
    li {
      position: relative;
      margin-left: 10px;
      font-size: 16px;
      color: ${props => hexToRgba(props.theme.foregroundWhite, .9)};
      &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translate(calc(-100% - 5px), -50%);
      width: 5px;
      height: 1px;
      background: ${props => props.theme.foregroundWhite};
      opacity: 0.9;
      }
    }
  }
  p {
    font-size: 18px;
    font-weight: 300;
  }
  img {
    width: 100%;
    border-top: 1px solid ${props => props.theme.foregroundWhite};
    height: 184px;
    object-fit: cover;
  }
`;


export const ProjectCard = ({title, desc, skills, imgSrc}) => {

  return (
    <ProjectCardWrapper>
      <div className="top">
        <div className="text">
          <h3>{title}</h3>
          <ul className="skills">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <p>{desc}</p>
        </div>
        <div className="links">
          <ButtonIcon href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FaSquareGithub/>
          </ButtonIcon>
          <ButtonIcon href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FaExternalLinkAlt />
          </ButtonIcon>
        </div>
      </div>

      <Image src={imgSrc}
             width={500}
             height={500}
             alt={`Project Screenshot for ${title}`} />
    </ProjectCardWrapper>
  )
}
