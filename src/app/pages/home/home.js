import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.title}>
      <h1>William Neve</h1>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h3>// Full Stack Developer</h3>
      <a href='#'>A link</a>
    </div>
  )
}

export default Home;
