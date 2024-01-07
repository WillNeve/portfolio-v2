'use client';
import { createContext, useState, useEffect } from 'react';
//styles
import Theme from './config/theme';
import GlobalStyle from './config/globals';
import {boxSeperationAnim, responsive} from './config/utilities'

//components
import Terminal from './components/Terminal/Terminal.js';
import CrtScreen from './components/CrtScreen/CrtScreen.js';
import Viewer from './components/Viewer/Viewer.js';
import Nav from './components/Nav/Nav.js';

export const PagesContext = createContext();


export default function Home() {
  const [page, setPage] = useState('~');
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

  return (
    <Theme>
      <GlobalStyle/>
      <PagesContext.Provider value={{pages, page, setPage}}>
      <main>
        <CrtScreen/>
        <Nav/>
        <Viewer page={page}/>
        <Terminal/>
      </main>
      </PagesContext.Provider>
    </Theme>
  );
}
