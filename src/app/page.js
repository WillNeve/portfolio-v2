import styles from './page.module.scss'
import Terminal from './components/terminal/terminal.js'
import CrtScreen from './components/CrtScreen/CrtScreen.js'

export default function Home() {
  return (
    <main className={styles.main}>
      <CrtScreen/>
      <Terminal/>
    </main>
  )
}
