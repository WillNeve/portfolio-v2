import Home from '../../pages/home/home.js';
import About from '../../pages/about/about.js';
import Contact from '../../pages/contact/contact.js';
import Nav from '../nav/nav.js';

const Viewer = ({page, className}) => {
  let inner;

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
      <div className={className}>
        <div className='r-container'>
          <Nav/>
          {inner}
        </div>
      </div>
  );
}

export default Viewer;
