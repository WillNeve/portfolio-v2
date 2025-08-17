import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.scss";
import styled, { css } from "styled-components";

//icons
import { BiBaguette } from "react-icons/bi";
import { BiCoffee } from "react-icons/bi";
import { BiGame } from "react-icons/bi";

//components
import { BodyText, EmphasisedText } from "@/app/components/Styles/Text";
import { ButtonSquare } from "@/app/components/Styles/Buttons";

import Skills from "./Skills/Skills";
import Projects from "./Projects/Projects";
import Work from "./Work/Work";

const Seperator = styled.span`
  display: block;
  width: 90%;
  height: 1px;
  background: ${(props) => props.theme.foregroundWhite};
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
                <h2>// Software Engineer</h2>
                <div className={styles.links}>
                  <ButtonSquare href="/cv.pdf" target="_blank">
                    CV
                  </ButtonSquare>
                  <ButtonSquare
                    href="https://www.linkedin.com/in/wneve/"
                    target="_blank"
                  >
                    LinkedIn
                  </ButtonSquare>
                  <ButtonSquare
                    href="https://github.com/WillNeve"
                    target="_blank"
                  >
                    GitHub
                  </ButtonSquare>
                </div>
                <div className={styles.icons}>
                  <BiCoffee />
                  <BiGame />
                  <BiBaguette />
                </div>
              </div>
            </div>
            <BodyText>
              Hey 👋, I&apos;m William,{" "}
              <EmphasisedText>Software Engineer</EmphasisedText> with{" "}
              <EmphasisedText> 3+ years experience</EmphasisedText> building
              impactful web products.
            </BodyText>
            <BodyText>
              Highly autonomous, eagerly collaborative, delivering end-to-end
              technical results in fast-paced environments, with a special focus
              on simplicity & scalability.
            </BodyText>

            <BodyText>
              I work with these everyday:{" "}
              <em style={{ color: "#2F73C0", fontWeight: "bold" }}>
                Typescript
              </em>
              {" / "}
              <em style={{ color: "#61DBFB", fontWeight: "bold" }}>React</em>
              {" / "}
              <em style={{ color: "#75AD5E", fontWeight: "bold" }}>Node.js</em>
              {" / "}
              <em style={{ color: "#d45da2", fontWeight: "bold" }}>Next.js</em>
              {" / "}
              <em style={{ color: "#FECB31", fontWeight: "bold" }}>Firebase</em>
              {" / "}
              <em style={{ color: "#31648C", fontWeight: "bold" }}>
                PostgreSQL
              </em>
            </BodyText>

            <BodyText>
              <EmphasisedText>French &#x1f1eb;&#x1f1f7;</EmphasisedText>,
              <EmphasisedText> English 🇬🇧 </EmphasisedText>and{" "}
              <EmphasisedText>American &#x1f1fa;&#x1f1f8;</EmphasisedText>, born
              in the United States, raised in London, where I currently reside.
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
      <Seperator />

      <Work />

      {/* <Seperator /> */}
      {/*
      <Projects /> */}

      <Seperator />

      <Skills />
    </>
  );
};

export default Home;
