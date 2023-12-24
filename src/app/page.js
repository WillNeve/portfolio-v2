'use client';

import styles from './page.module.scss'
import windowStyles from './window.module.scss'
import Terminal from './components/terminal/terminal.js'
import CrtScreen from './components/crt_screen/CrtScreen.js'
import Viewer from './components/viewer/viewer.js'
import { useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faS } from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faLinkedin, faS, faEnvelope, faGithub)

export default function Home() {
  const [page, setPage] = useState('~')

  const handlePageChange = (page) => {
    setPage(page)
  }

  return (
    <main className={windowStyles.main}>
      <CrtScreen/>
      <Viewer page={page}/>
        <div className={windowStyles.terminalSection}>
          <Terminal onPageChange={handlePageChange}/>
        </div>
    </main>
  )
}
