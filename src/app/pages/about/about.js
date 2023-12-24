import styles from './about.module.scss';

const About = () => {
  return (
    <div>
      <div className={styles.intro}>
        <div>
          <h1>About me.</h1>
          <p>Hi I&apos;m Will whats up there partner</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.headshot} src='headshot.jpg' alt='profile headshot of William Neve'></img>
      </div>
      <div>
        <p>French and English developer, born in the States, raised in London</p>

        <p>Lead Teacher @ Le Wagon London, sharing my passion and knowledge of Full Stack Development to aspiring techies</p>
      </div>
    </div>
  )
}

export default About;
