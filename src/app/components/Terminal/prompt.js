import styles from './terminal.module.scss';


const Prompt = ({path}) => {
  return (
    <div className={styles.prompt}>
      <p>{'>'}</p>
      <p>{path}</p>
      <strong>$</strong>
    </div>
  );
}

export default Prompt;
