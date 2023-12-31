'use client';
import { createContext, useState } from 'react';

//styles
import styled from 'styled-components';
import Theme from './config/theme';
import GlobalStyle from './config/globals';
import {boxSeperationAnim, responsive} from './config/utilities'
//components
import Terminal from './components/Terminal/Terminal.js';
import CrtScreen from './components/CrtScreen/CrtScreen.js';
import Viewer from './components/Viewer/Viewer.js';
import Nav from './components/Nav/Nav.js';

export const PagesContext = createContext();

const TerminalSection = styled.div`
  ${responsive};
  position: relative;
  height: ${props => props.$expanded ? '20%' : '10%'};
  transition: height .2s ease;
  p {
    margin: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.hackerGreen};
    ${props => boxSeperationAnim(props.theme.hackerGreen, .5)};
  }
`;


export default function Home() {
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [page, setPage] = useState('contact');
  const pages = {
    '~': {
      pwd: '~',
    },
    'about': {
      pwd: '~/about'
    },
    'contact': {
      pwd: '~/contact'
    },
    'pong': {
      pwd: '~/pong'
    }
  };

  pages['about'].parent = '~';
  pages['contact'].parent = '~';
  pages['pong'].parent = '~';

  const handleTerminalClick = () => {
    setTerminalExpanded(true);
  }

  const handleMainClick = (e) => {
    if (!e.target.closest(`.${TerminalSection.styledComponentId}`)) {
      setTerminalExpanded(false);
    }
  }

  return (
    <Theme>
      <GlobalStyle/>
      <PagesContext.Provider value={{pages, page, setPage}}>
      <main onClick={handleMainClick}>
        <CrtScreen/>
        <Nav/>
        <Viewer page={page}/>
          <TerminalSection $expanded={terminalExpanded} onClick={handleTerminalClick}>
            <Terminal/>
          </TerminalSection>
      </main>
      </PagesContext.Provider>
    </Theme>
  );
}
