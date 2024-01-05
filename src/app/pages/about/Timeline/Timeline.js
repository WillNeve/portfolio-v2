import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { hexToRgba } from '@/app/config/utilities';
import { dateToGB } from '@/app/utilities/date';

import LoadingSection from './LoadingSection';
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
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  margin: 20px 0px;
  padding-left: 10px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    row-gap: 6px;
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }
    p {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      color: ${props => hexToRgba(props.theme.foregroundWhite, .7)};
    }
    @media (min-width: 800px) {
      h3 {
        font-size: 22px;
      }
      p {
        font-size: 18px;
      }
    }
  }
  .body {
    margin-top: 10px;
    font-weight: 300;
    font-size: 18px;
  }
`;

const SectionGroup = styled.div`

  h2 {
    color: ${props => props.theme.hackerGreen};
    font-weight: 300;
  }
  margin: 10px 0px;
  /* border: ${props => props.$focused ? `2px solid ${props.theme.hackerGreen}` : 'none'}; */
`;

const TimeLineSide = styled.div`
  position: relative;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-right: 10px;
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
import { TbMoodKid } from "react-icons/tb";
import { FaSeedling } from "react-icons/fa";


const TimeLine = () => {
  const sectionsRef = useRef(null);

  const journeyGroupsRef = useRef(null);
  const eduGroupsRef = useRef(null);
  const workGroupsRef = useRef(null);

  const [focusedSection, setFocusedSection] = useState(journeyGroupsRef.current);

  const [timeLineItems, setTimeLineItems] = useState({
                                                        journey: null,
                                                        education: null,
                                                        work: null
                                                      });

  const getTimeLineItems = async () => {
    const res = await fetch(`/api/timeline-items`, { cache: 'no-store', revalidate: 0 })
    const data = await res.json();
    const rows = data.rows;

    const education = rows.filter(item => item.category === 'Education');
    const work = rows.filter(item => item.category === 'Work');
    const journey = rows.filter(item => item.category === 'Journey');
    setTimeLineItems({
      education: education,
      work: work,
      journey: journey
    })
  }

  const processGroupIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setFocusedSection(entry.target);
      }
    })
  }

  const startObserver = () => {
    const options = {
      root: sectionsRef.current,
      rootMargin: "-200px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(processGroupIntersect, options);

    const sections = [journeyGroupsRef, eduGroupsRef, workGroupsRef];
    sections.forEach((section) => {
      observer.observe(section.current)
    });

    return observer;
  }

  useEffect(() => {
    getTimeLineItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (timeLineItems.journey !== null) {
      const observer = startObserver();

      return () => {
        observer.disconnect();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLineItems])

  return (
    <Timeline>
      <TimeLineSide>
        <SectionIcon $focused={focusedSection === journeyGroupsRef.current}>
          <FaSeedling className='icon'/>
        </SectionIcon>
        <SectionIcon  $focused={focusedSection === eduGroupsRef.current}>
          <IoSchool className='icon'/>
        </SectionIcon>
        <SectionIcon  $focused={focusedSection === workGroupsRef.current}>
          <MdOutlineWorkOutline className='icon'/>
        </SectionIcon>
      </TimeLineSide>
      <Sections ref={sectionsRef}>
        <SectionGroup ref={journeyGroupsRef} $focused={focusedSection === journeyGroupsRef.current}>
          <h2>Journey</h2>
          {timeLineItems.journey === null ? (
            <LoadingSection></LoadingSection>
          ) : timeLineItems.journey.length === 0 ? (
            <Section>
              <p>no items...</p>
            </Section>
          ) : (
            timeLineItems.journey.map(({ title, date, body }, index) => (
              <Section key={index}>
                <div>
                  <h3>{title}</h3>
                  <p>{dateToGB(date)}</p>
                </div>
                <p className='body'>{body}</p>
              </Section>
            ))
          )}

        </SectionGroup>

        <SectionGroup ref={eduGroupsRef} $focused={focusedSection === eduGroupsRef.current}>
          <h2>Education</h2>
          {timeLineItems.education === null ? (
            <LoadingSection></LoadingSection>
          ) : timeLineItems.education.length === 0 ? (
            <Section>
              <p>no items...</p>
            </Section>
          ) : (
            timeLineItems.education.map(({ title, date, body }, index) => (
              <Section key={index}>
                <div>
                  <h3>{title}</h3>
                  <p>{dateToGB(date)}</p>
                </div>
                <p>{body}</p>
              </Section>
            ))
          )}
        </SectionGroup>

        <SectionGroup ref={workGroupsRef} $focused={focusedSection === workGroupsRef.current}>
          <h2>Work</h2>
          {timeLineItems.work === null ? (
            <LoadingSection></LoadingSection>
          ) : timeLineItems.work.length === 0 ? (
            <Section>
              <p>no items...</p>
            </Section>
          ) : (
            timeLineItems.work.map(({ title, date, body }, index) => (
              <Section key={index}>
                <div>
                  <h3>{title}</h3>
                  <p>{dateToGB(date)}</p>
                </div>
                <p>{body}</p>
              </Section>
            ))
          )}
        </SectionGroup>
      </Sections>
    </Timeline>
  )
}

export default TimeLine
