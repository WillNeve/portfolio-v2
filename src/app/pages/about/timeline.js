import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { BodyText } from '@/app/components/Styles/Text';

const Timeline = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
  padding: 20px 0px;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-left: 20px;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  margin: 20px 0px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    column-gap: 10px;
    h3 {
      margin: 0;
      font-size: 20px;
    }
    p {
      margin: 0;
      font-size: 16px;
      opacity: .9;
    }
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: center;
      h3 {
        font-size: 22px;
      }
      p {
        font-size: 18px;
      }
    }
  }
`;

const SectionGroup = styled.div`
  margin: 10px 0px;
  /* border: ${props => props.$focused ? `2px solid ${props.theme.hackerGreen}` : 'none'}; */
`;

const TimeLineSide = styled.div`
  position: relative;
  width: 10%;
  min-width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  &::after {
    content: '';
    height: 90%;
    width: 2px;
    background: ${props => props.theme.hackerGreen};
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(100%, -50%);
  }
`;


const SectionIcon = styled.div`
  .icon {
    width: 30px;
    height: auto;
    aspect-ratio: 1;
    transition: color .2s ease;
    color: ${props => props.$focused ? props.theme.hackerGreen : props.theme.foregroundWhite};
  }
`;


//icons
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";


const TimeLine = () => {
  const sectionsRef = useRef(null);

  const youngGroupsRef = useRef(null);
  const eduGroupsRef = useRef(null);
  const workGroupsRef = useRef(null);

  const sections = [youngGroupsRef, eduGroupsRef, workGroupsRef];
  const [focusedSection, setFocusedSection] = useState(null);

  const processGroupIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
        setFocusedSection(entry.target);
      }
    })
  }

  useEffect(() => {
    const options = {
      root: sectionsRef.current,
      rootMargin: "0px",
      threshold: 0.7,
    };

    let observer = new IntersectionObserver(processGroupIntersect, options);

    sections.forEach((section) => {
      observer.observe(section.current)
    });

    return () => {
      observer.disconnect();
    }
  }, [])


  return (
    <Timeline>
      <TimeLineSide>
        <SectionIcon $focused={focusedSection === youngGroupsRef.current}>
          <MdChildCare className='icon'/>
        </SectionIcon>
        <SectionIcon  $focused={focusedSection === eduGroupsRef.current}>
          <IoSchool className='icon'/>
        </SectionIcon>
        <SectionIcon  $focused={focusedSection === workGroupsRef.current}>
          <MdOutlineWorkOutline className='icon'/>
        </SectionIcon>
      </TimeLineSide>
      <Sections ref={sectionsRef}>
        <SectionGroup ref={youngGroupsRef} $focused={focusedSection === youngGroupsRef.current}>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
        </SectionGroup>

        <SectionGroup ref={eduGroupsRef} $focused={focusedSection === eduGroupsRef.current}>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
        </SectionGroup>

        <SectionGroup ref={workGroupsRef} $focused={focusedSection === workGroupsRef.current}>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
          <Section>
            <div>
              <h3>An Event</h3>
              <p>03/01/2024</p>
            </div>
            <BodyText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorem nesciunt autem perferendis facilis est, iure debitis fugit ab. Dolore commodi accusantium in eligendi laudantium, quo aperiam deserunt ut nobis?</BodyText>
          </Section>
        </SectionGroup>
      </Sections>
    </Timeline>
  )
}

export default TimeLine
