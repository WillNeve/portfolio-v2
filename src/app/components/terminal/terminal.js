import styles from './terminal.module.scss'

function Line({content, extra}) {
  return (
    <p>{content} and {extra}</p>
  )
}

function Input() {
  return (
    <textarea className={styles.input}>test</textarea>
  )
}

export default function Terminal() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.linesContainer}>
        <Line content={'test'} extra='hello'/>
      </div>
      <Input/>
    </div>
  )
}
