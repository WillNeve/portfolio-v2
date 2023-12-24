import styles from './contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = () => {
  return (
    <div>
      <h1>Contact me.</h1>
      <p>Where you can find me</p>
      <ul className={styles.linkList}>
        <li>
          <a href='https://www.linkedin.com/in/william-neve-66a13819a/' target='_blank' className='icon'>
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
          </a>
        </li>

        <li>
          <a href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FontAwesomeIcon icon="fa-brands fa-github" />
          </a>
        </li>

        <li>
          <a href='mailto:williamneve6000@gmail.com' target='_blank' className='icon'>
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
          </a>
        </li>

      </ul>
    </div>
  )
}

export default Contact;
