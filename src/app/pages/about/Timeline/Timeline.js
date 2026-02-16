import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { hexToRgba } from "@/app/config/utilities";
import { dateToGB } from "@/app/utilities/date";

import { TIMELINE_ITEMS } from "@/data/timelineItems";

//icons
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSeedling } from "react-icons/fa";

const Timeline = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
  padding-top: 20px;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-left: 20px;
  padding-top: 60px;
  padding-bottom: 60px;
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
      font-size: 22px;
      font-weight: 400;
    }
    p {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      color: ${(props) => hexToRgba(props.theme.foregroundWhite, 0.7)};
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
    font-size: 20px;
  }
`;

const SectionGroup = styled.div`
  h2 {
    font-weight: 400;
    font-size: 24px;
    color: ${(props) =>
      props.$focused ? props.theme.hackerGreen : props.theme.foregroundWhite};
  }
  margin: 5px 0px;
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
    content: "";
    height: 90%;
    width: 2px;
    background: ${(props) => props.theme.hackerGreen};
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
    transition: color 0.2s ease;
    color: ${(props) =>
      props.$focused ? props.theme.hackerGreen : props.theme.foregroundWhite};
  }
`;

const SECTION_KEYS = ["journey", "education", "work"];

const TimeLine = () => {
  const sectionsRef = useRef(null);
  const journeyRef = useRef(null);
  const educationRef = useRef(null);
  const workRef = useRef(null);

  const [focusedSection, setFocusedSection] = useState("journey");

  const refMap = {
    journey: journeyRef,
    education: educationRef,
    work: workRef,
  };

  useEffect(() => {
    const container = sectionsRef.current;
    if (!container) return;

    const refs = [
      { key: "journey", ref: journeyRef },
      { key: "education", ref: educationRef },
      { key: "work", ref: workRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });

        if (best) {
          const match = refs.find((r) => r.ref.current === best.target);
          if (match) {
            setFocusedSection(match.key);
          }
        }
      },
      {
        root: container,
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Timeline>
      <TimeLineSide>
        <SectionIcon $focused={focusedSection === "journey"}>
          <FaSeedling className="icon" />
        </SectionIcon>
        <SectionIcon $focused={focusedSection === "education"}>
          <IoSchool className="icon" />
        </SectionIcon>
        <SectionIcon $focused={focusedSection === "work"}>
          <MdOutlineWorkOutline className="icon" />
        </SectionIcon>
      </TimeLineSide>
      <Sections ref={sectionsRef}>
        <SectionGroup
          ref={journeyRef}
          $focused={focusedSection === "journey"}
        >
          <h2>Journey</h2>
          {TIMELINE_ITEMS.journey.map(({ title, date, body }, index) => (
            <Section key={index}>
              <div>
                <h3>{title}</h3>
                <p>{dateToGB(date)}</p>
              </div>
              <p className="body">{body}</p>
            </Section>
          ))}
        </SectionGroup>

        <SectionGroup
          ref={educationRef}
          $focused={focusedSection === "education"}
        >
          <h2>Education</h2>
          {TIMELINE_ITEMS.education.map(({ title, date, body }, index) => (
            <Section key={index}>
              <div>
                <h3>{title}</h3>
                <p>{dateToGB(date)}</p>
              </div>
              <p className="body">{body}</p>
            </Section>
          ))}
        </SectionGroup>

        <SectionGroup
          ref={workRef}
          $focused={focusedSection === "work"}
        >
          <h2>Work</h2>
          {TIMELINE_ITEMS.work.map(({ title, date, body }, index) => (
            <Section key={index}>
              <div>
                <h3>{title}</h3>
                <p>{dateToGB(date)}</p>
              </div>
              <p className="body">{body}</p>
            </Section>
          ))}
        </SectionGroup>
      </Sections>
    </Timeline>
  );
};

export default TimeLine;
