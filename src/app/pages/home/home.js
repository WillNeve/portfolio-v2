import styles from './home.module.scss';

//icons
import { BiBaguette } from "react-icons/bi";
import { BiCoffee } from "react-icons/bi";


const Home = () => {
  return (
    <div className={styles.title}>
      <div className={styles.intro}>
        <div className={styles.text}>
          <h1>William Neve</h1>
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <h3>// Full Stack Developer</h3>
          <div className={styles.links}>
            <a href='https://www.linkedin.com/in/william-neve-66a13819a/' target='_blank'>LinkedIn</a>
            <a href='https://github.com/WillNeve' target='_blank'>GitHub</a>
          </div>
          <div className={styles.icons}>
            <BiCoffee/>
            <BiBaguette/>
          </div>
        </div>
        <img className={styles.headshot} src='headshot.jpg' alt='profile headshot of William Neve'></img>
      </div>
      <p>Hey, I&apos;m William, passionate Full Stack Developer with an interest in creating impactful and exciting user experiences.</p>

      <p>Im French and English, born in the States, raised in London, where I currently reside.</p>

      <p>I&apos;v built this portfolio page to be navigated by terminal below - If you prefer a more traditional navigation style please use the menu <em>?</em> above above to switch pages</p>

    </div>
  )
}

export default Home;
