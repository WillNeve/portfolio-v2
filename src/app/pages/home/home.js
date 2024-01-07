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
                <h2>// Full Stack Developer</h2>
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
            <BodyText>Hey &#128512;, I&apos;m William, zealous <EmphasisedText>Full Stack Developer</EmphasisedText> with an interest in creating impactful and exciting user experiences.</BodyText>

            <BodyText>Im <EmphasisedText>French</EmphasisedText> and <EmphasisedText>English</EmphasisedText>, born in the States, raised in London, where I currently reside.</BodyText>

            <BodyText><EmphasisedText>Lead Teacher</EmphasisedText> @ <InlineLink href='https://www.lewagon.com/web-development-course'>Le Wagon London</InlineLink>, sharing my passion and proficiency in Full Stack Development with aspiring techies.</BodyText>

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

      <Skills/>

      <Seperator/>

      <Projects/>
    </>
  )
}

export default Home;
