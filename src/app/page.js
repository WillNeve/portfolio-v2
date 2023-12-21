import Image from 'next/image'
import styles from './page.module.scss'
import Terminal from './components/terminal/terminal.js'

export default function Home() {
  return (
    <main className={styles.main}>
      <Terminal/>
    </main>
  )
}
