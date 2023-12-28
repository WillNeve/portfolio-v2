'use client';
import { createContext, useState } from 'react';

//styles
import styles from './page.module.scss';
import StyledComponentsConfig from './config/styled-component-config';
//components
import Terminal from './components/Terminal/Terminal.js';
import CrtScreen from './components/CrtScreen/CrtScreen.js';
import Viewer from './components/Viewer/Viewer.js';
import Nav from './components/Nav/Nav.js';

export const PagesContext = createContext();

export default function Home() {
  const [page, setPage] = useState('~');
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const pages = ['~', 'about', 'contact'];

  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  }

  const handleTerminalClick = () => {
    console.log('terminal clicked');
    setTerminalExpanded(true);
  }

  const handleMainClick = (e) => {
    if (!e.target.closest(`.${styles.terminalSection}`)) {
      setTerminalExpanded(false);
    }
  }

  return (
    <StyledComponentsConfig>
      <PagesContext.Provider value={pages}>
      <main onClick={handleMainClick}
            className={styles.main}>
        <CrtScreen/>
        <Nav activePage={page} onPageChange={handlePageChange}/>
        <Viewer page={page} className={styles.viewWrapper}/>
          <div onClick={handleTerminalClick} className={terminalExpanded ? `${styles.terminalSection} ${styles.expanded}` : `${styles.terminalSection}`}>
            <Terminal onPageChange={handlePageChange} className={styles.terminalWrapper}/>
          </div>
      </main>
      </PagesContext.Provider>
    </StyledComponentsConfig>
  );
}
