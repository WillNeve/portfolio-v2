import styles from './viewer.module.scss';
import windowStyles from '../../window.module.scss'
import Home from '../../pages/home/home.js';
import About from '../../pages/about/about.js';
import Contact from '../../pages/contact/contact.js';

const Viewer = ({page}) => {
  let inner;

  const root = (
    <div>
      <h1>Welcome to my Portfolio</h1>
      <p>asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</p>
    </div>
  )

  const about = (
    <div>
      <h1>About me.</h1>
      <p>Hi I&apos;m Will whats up there partner</p>
      <img src='headshot.jpg'></img>
    </div>
  )



  switch (page) {
    case '~':
      inner = (<Home/>);
      break;
    case 'about':
      inner = (<About/>);
      break;
    case 'contact':
      inner = (<Contact/>);
      break;
  }


  return (
      <div className={windowStyles.viewWrapper}>
        {inner}
      </div>
  )
}


export default Viewer;
