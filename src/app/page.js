'use client';
//styles
import styles from './page.module.scss';

//components
import Terminal from './components/terminal/terminal.js';
import CrtScreen from './components/crt_screen/CrtScreen.js';
import Viewer from './components/viewer/viewer.js';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState('~');
  const [terminalExpanded, setTerminalExpanded] = useState(false);

  const handlePageChange = (page) => {
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
    <main onClick={handleMainClick} className={styles.main}>
      <CrtScreen/>
      <Viewer page={page} className={styles.viewWrapper}/>
        <div onClick={handleTerminalClick} className={terminalExpanded ? `${styles.terminalSection} ${styles.expanded}` : `${styles.terminalSection}`}>
          <Terminal onPageChange={handlePageChange} className={styles.terminalWrapper}/>
        </div>
    </main>
  );
}
