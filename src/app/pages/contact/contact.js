import styles from './contact.module.scss';

//icons
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";




const Contact = () => {
  return (
    <div>
      <h1>Contact me.</h1>
      <p>Where you can find me</p>
      <ul className={styles.socialLinks}>
        <li>
          <a href='https://www.linkedin.com/in/william-neve-66a13819a/' target='_blank' className='icon'>
            <FaLinkedin/>
          </a>
        </li>

        <li>
          <a href='https://github.com/WillNeve' target='_blank' className='icon'>
            <FaSquareGithub/>
          </a>
        </li>

        <li>
          <a href='mailto:williamneve6000@gmail.com' target='_blank' className='icon'>
            <FaEnvelope/>
          </a>
        </li>

      </ul>
    </div>
  )
}

export default Contact;
