'use client';

import styles from './page.module.scss'
import windowStyles from './window.module.scss'
import Terminal from './components/terminal/terminal.js'
import CrtScreen from './components/crt_screen/CrtScreen.js'
import Viewer from './components/viewer/viewer.js'
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState('~')

  const handlePageChange = (page) => {
    setPage(page)
  }

  return (
    <main className={windowStyles.main}>
      <CrtScreen/>
      <Viewer page={page}/>
      <Terminal onPageChange={handlePageChange}/>
    </main>
  )
}
