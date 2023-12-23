import styles from './about.module.scss';

const About = () => {
  return (
    <div>
      <div className={styles.intro}>
        <div>
          <h1>About me.</h1>
          <p>Hi I&apos;m Will whats up there partner</p>
        </div>
        <img className={styles.headshot} src='headshot.jpg'></img>
      </div>
    </div>
  )
}

export default About;
