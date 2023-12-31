import Image from 'next/image';
import styles from './home.module.scss';
import { css } from 'styled-components';

//icons
import { BiBaguette } from "react-icons/bi";
import { BiCoffee } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";


const Home = () => {
  return (
    <div className={styles.title}>
      <div className={styles.intro}>
        <div className={styles.text}>
          <h1>William Neve</h1>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <h2>// Full Stack Developer</h2>
          <div className={styles.links}>
            <a href='https://www.linkedin.com/in/william-neve-66a13819a/' target='_blank'>LinkedIn</a>
            <a href='https://github.com/WillNeve' target='_blank'>GitHub</a>
          </div>
          <div className={styles.icons}>
            <BiCoffee/>
            <BiBaguette/>
          </div>
        </div>
        <Image
          src="/headshot.jpg"
          className={styles.headshot}
          width={500}
          height={500}
          alt="profile headshot of William Neve"
        />
      </div>
      <p>Hey, I&apos;m William, passionate Full Stack Developer with an interest in creating impactful and exciting user experiences.</p>

      <p>Im French and English, born in the States, raised in London, where I currently reside.</p>

      <p>I&apos;v built this portfolio page to be navigated by terminal below - If you prefer a more traditional navigation style please use the menu <IoMdMenu style={{marginBottom: '-4px', color: '#51e251'}}/> above above to switch pages</p>
    </div>
  )
}

export default Home;
