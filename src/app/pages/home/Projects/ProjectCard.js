import styled from "styled-components";
import Image from 'next/image';
import { hexToRgba } from "@/app/config/utilities";
import { ButtonIcon } from "@/app/components/Styles/Buttons";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";


const ProjectCardWrapper = styled.div`
  border: 1px dashed yellow;
  display: flex;
  min-width: 320px;
  width: calc(100% - 30px);
  max-width: 600px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid ${props => props.theme.foregroundWhite};
  .top {
    display: flex;
    align-items: start;
    column-gap: 10px;
    padding: 10px;
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
    img {
      margin-top: 1px solid ${props => props.theme.foregroundWhite};
    }
  }

  h3 {
    color: ${props => props.theme.hackerGreen};
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
    height: 184px;
    object-fit: cover;
  }
`;


const ProjectCard = ({title, desc, skills, imgSrc}) => {

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
            <FaExternalLinkAlt />
          </ButtonIcon>
          <ButtonIcon href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FaSquareGithub/>
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

export default ProjectCard;
