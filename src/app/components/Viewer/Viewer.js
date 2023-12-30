import Home from '../../pages/home/home.js';
import About from '../../pages/about/about.js';
import Contact from '../../pages/contact/contact.js';

import styled from 'styled-components';
import {responsive} from '../../config/utilities.js';

const ViewerWrapper = styled.div`
  padding-top: 25px;
  width: 100%;
  height: 80%;
  flex-grow: 1;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    ${responsive};
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
