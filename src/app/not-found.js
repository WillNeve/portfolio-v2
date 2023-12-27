import Link from 'next/link'
import styles from './page.module.scss'

export default function NotFound() {
  return (
    <div className={styles.errorWrapper}>
      <h1>Uh oh, the page you are looking for does not exist</h1>
      <abbr className={styles['error-code']}>404</abbr>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}
