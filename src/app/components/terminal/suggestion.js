import styles from './terminal.module.scss'


const Suggestion = ({paths, active, highlighted}) => {
  return (
    <div className={`${styles.suggestionBox} ${(active ? styles.visible : '')}`}>
      {paths.map((path, index) => (
        <p key={index} className={`${styles.suggestion} ${(index === highlighted ? styles.highlighted : '')}`}>{path}</p>
      ))}
    </div>
  )
}

export default Suggestion;
