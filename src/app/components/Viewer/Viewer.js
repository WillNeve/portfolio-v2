import Home from '../../pages/home/home.js';
import About from '../../pages/about/about.js';
import Contact from '../../pages/contact/contact.js';
import Pong from '../../pages/pong/pong.js';

import styled from 'styled-components';
import {responsive} from '../../config/utilities.js';

const ViewerWrapper = styled.div`
  padding: 0px 2px;
  padding-top: calc(50px + 8%);
  @media (min-width: 800px) {
    padding-top: calc(25px + 8%);
  }
  width: 100%;
  height: 80%;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    ${responsive};
    height: 100%;
  }
`;

const Viewer = ({page}) => {
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
    case 'pong':
      inner = (<Pong/>);
      break;
  }

  return (
      <ViewerWrapper>
        <div>
          {inner}
        </div>
      </ViewerWrapper>
  );
}

export default Viewer;
