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
  min-width: 310px;
  width: calc(100% - 30px);
  max-width: 500px;
  height: 150px;
  display: flex;
  background-color: rgba(81,226,81,0.1);
  .text {
    width: 70%;
    height: 100%;
    padding: 10px;
    & > div {
      background-color: rgba(81,226,81,0.1);
    }
    .title {
      width: 70%;
      height: 30px;
    }
    .tech {
      background: none;
      margin: 10px 0px;
      display: flex;
      justify-content: space-between;
      column-gap: 5px;
      height: 20px;
      width: 50%;
      div {
        background-color: rgba(81,226,81,0.1);
        width: 30%;
      }
    }
    .desc {
      width: 80%;
      height: 50px;
    }
  }
  .img {
    background-color: rgba(81,226,81,0.1);
    width: 30%;
    height: 100%;
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
        <div className="text">
          <div className="title">
            <div className="animated"></div>
          </div>
          <div className="tech">
            <div className="animated"></div>
            <div className="animated"></div>
            <div className="animated"></div>
          </div>
          <div className="desc">
            <div className="animated"></div>
          </div>
        </div>
        <div className="img">
          <div className="animated"></div>
        </div>
    </LoadingCardWrapper>
  );
}


const ProjectCardWrapper = styled.div`
  position: relative;
  border: 1px solid ${props => hexToRgba(props.theme.foregroundWhite, .7)};
  display: flex;
  min-width: 310px;
  width: calc(100% - 30px);
  max-width: 500px;
  height: fit-content;

  .text {
    width: 70%;
    padding: 10px;
    h3 {
      color: ${props => props.theme.hackerGreen};
    }
    ul {
      margin-top: 5px;
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
      font-weight: 200;
      font-size: 18px;
    }
  }

  .image-container {
    position: relative;
    width: 30%;
    border-left: 1px solid ${props => hexToRgba(props.theme.foregroundWhite, .7)};
    img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0);
    }
  }

  .links {
    position: absolute;
    z-index: 2;
    bottom: 10px;
    right: 10px;
    display: flex;
    background: ${props => hexToRgba(props.theme.backgroundBlack, .9)};
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 25px;
      }
    }
  }
`;


export const ProjectCard = ({title, desc, skills, githubUrl, deployUrl, imgSrc}) => {

  return (
    <ProjectCardWrapper>
      <div className="text">
        <h3>{title}</h3>
        <ul className="skills">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <p className="desc">{desc}</p>
      </div>

      <div className="links">
          <ButtonIcon href={githubUrl ? githubUrl : '#'} target='_blank' className='icon' aria-label={`Github Repository Link for ${title} project`}>
            <FaSquareGithub/>
          </ButtonIcon>
          <ButtonIcon href={deployUrl ? deployUrl : '#'} target='_blank' className='icon' aria-label={`Live deployment link for ${title} project`}>
            <FaExternalLinkAlt />
          </ButtonIcon>
        </div>
      <div className="image-container">
        <Image src={imgSrc}
              width={500}
              height={500}
              alt={`Project Screenshot for ${title}`} />
      </div>
    </ProjectCardWrapper>
  )
}
