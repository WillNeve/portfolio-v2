import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.scss';
import styled, { css } from 'styled-components';

//icons
import { BiBaguette } from "react-icons/bi";
import { BiCoffee } from "react-icons/bi";

//components
import { BodyText, EmphasisedText, InlineLink } from '@/app/components/Styles/Text';
import { ButtonSquare } from '@/app/components/Styles/Buttons';

import Skills from './Skills/Skills';
import Projects from './Projects/Projects';

const Seperator = styled.span`
  display: block;
  width: 90%;
  height: 1px;
  background: ${props => props.theme.foregroundWhite};
  margin: 20px 0px;
`;

const Home = () => {
  return (
    <>
      <div className={styles.title}>
        <div className={styles.intro}>
          <div className={styles.text}>
            <div className={styles.top}>
                <Image
                src="/headshot.jpg"
                className={`${styles.headshot} ${styles.inline}`}
                width={500}
                height={500}
                alt="profile headshot of William Neve"
                priority
              />
              <div>
                <h1>William Neve</h1>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <h2>// Software Developer</h2>
                <div className={styles.links}>
                  <ButtonSquare href="/cv.pdf" target="_blank">CV</ButtonSquare>
                  <ButtonSquare href='https://www.linkedin.com/in/william-neve-66a13819a/' target='_blank'>LinkedIn</ButtonSquare>
                  <ButtonSquare href='https://github.com/WillNeve' target='_blank'>GitHub</ButtonSquare>
                </div>
                <div className={styles.icons}>
                  <BiCoffee/>
                  <BiBaguette/>
                </div>
              </div>
            </div>
            <BodyText>Hey &#128512;, I&apos;m William, dynamic and adaptable <EmphasisedText>Software Developer</EmphasisedText> with 2 years experience building impactful web apps.</BodyText>

            <BodyText>
              Currently specializing in:{" "}
              <em style={{color: '#2F73C0', fontWeight: 'bold'}}>Typescript</em>{" / "}
              <em style={{color: '#61DBFB', fontWeight: 'bold'}}>React</em>{" / "}
              <em style={{color: '#FECB31', fontWeight: 'bold'}}>Firebase</em>{" / "}
              <em style={{color: '#75AD5E', fontWeight: 'bold'}}>Node.js</em>{" / "}
              <em style={{color: '#31648C', fontWeight: 'bold'}}>Postgres</em>{" / "}
              <em style={{color: '#06E561', fontWeight: 'bold'}}>MongoDB</em>.
            </BodyText>


            <BodyText>Im <EmphasisedText>French</EmphasisedText> and <EmphasisedText>American</EmphasisedText>, born in the United States, raised in London, where I currently reside.</BodyText>

            <BodyText>
              - <EmphasisedText>Software Developer</EmphasisedText>
              {' @ '} <InlineLink href='https://www.linkedin.com/company/ggversus/'>Versus</InlineLink>
              : collaborating with a dynamic team to craft an innovative esports platform, accessable to all.
            </BodyText>

            <BodyText>
              - <EmphasisedText>Lead Teacher</EmphasisedText>
              {' @ '} <InlineLink href='https://www.lewagon.com/web-development-course'>Le Wagon London</InlineLink>
              : sharing passion and expertise to facilitate student comprehension of technical topics via engaging lectures, personalized support, code reviews, and project management.
            </BodyText>


          </div>
          <Image
            src="/headshot.jpg"
            className={`${styles.headshot} ${styles.right}`}
            width={500}
            height={500}
            alt="profile headshot of William Neve"
            priority
          />
        </div>
      </div>
      <Seperator/>

      <Projects/>

      <Seperator/>

      <Skills/>
    </>
  )
}

export default Home;
