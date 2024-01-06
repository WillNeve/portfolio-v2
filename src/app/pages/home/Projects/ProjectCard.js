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

  /* border: 1px dashed yellow;
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
    padding: 10px;
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
  }

  img {
    filter: saturate(0);
    transition: filter .2s ease;
    &:hover {
      filter: saturate(1);
    }
    border-top: 1px solid ${props => props.theme.foregroundWhite};
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
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  width: 350px;
  height: fit-content;
  .top {
    width: 60%;
    padding: 16px;
    h4, p {
      text-align: left;
    }
    h4 {
      font-size: 1.4rem;
    }
    .desc {
      font-size: 0.8rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      row-gap: 5px;
      margin-top: 5px;
      margin-left: 7px;
      list-style-type: none;
    }
    .tech-label {
      width: fit-content;
      font-size: 0.7rem;
      &::before {
        height: 6px;
        transform: translate(calc(-100% - 1px), -50%);
      }
    }

  }
  .tech-label {
    color: $subtle-white !important;
    border-color: $subtle-white;
  }
  .img-container {
    position: absolute;
    right: 0px;
    top: 0px;
    @include resetBox;
    border-left: 1px solid rgba($color: $white, $alpha: 0.3);
    // border: 2px dashed red;
    box-shadow: -1px 0px 5px 2px rgba($color: $white, $alpha: 0.1);
    width: 40%;
    height: 100%;
    overflow: hidden;
    .filter {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background: rgb(83,216,251);
      background: linear-gradient(90deg, rgba(83,216,251,1) 0%, rgba(0,0,0,1) 78%);
      opacity: .5;
      z-index: 2;
      transition: opacity .5s ease;
      // border: 2px dashed red;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      filter: saturate(0);
      opacity: 0.8;
      object-fit: cover;
      object-position: 50% 50%;
      transition: all .5s ease;
    }
  }
  .links {
    display: flex;
    column-gap: 5px;
    background: rgba($color: $charcoal, $alpha: 0.5);
    border: 1px solid rgba($color: $white, $alpha: 0.3);
    border-radius: 10px;
    @include backdropBlur(5px);
    padding: 6px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 3;
    a {
      display: block;
      width: fit-content;
      padding: 6px;
      // border: 1px dashed yellow;
      font-size: 1.5rem;
      transition: all .3s ease;
      i {
        display: block;
        color: rgba($color: $white, $alpha: 0.8);
      }
      &:hover {
        opacity: 0.7;
        transform: scale(1.05);
      }
    }
  } */
`;


export const ProjectCard = ({title, desc, skills, imgSrc}) => {

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
          <ButtonIcon href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FaSquareGithub/>
          </ButtonIcon>
          <ButtonIcon href='https://github.com/WillNeve' target='_blank' className='icon'>
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
