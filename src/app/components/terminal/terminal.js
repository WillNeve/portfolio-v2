"use client";
import { useState } from 'react';

import styles from './terminal.module.scss'

const Line = ({content}) => {
  return (
    <p>{content}</p>
  )
}

const Input = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(inputValue)

      setInputValue('')
    }
  }

  return (
    <textarea className={styles.input} onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows='1'>
    </textarea>
  )
}

const Prompt = ({path}) => {
  return (
    <div className={styles.prompt}>
      <p>{'>'}</p>
      <p>{path}</p>
      <strong>$</strong>
    </div>
  )
}


const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [path, setPath] = useState('home')

  const handleInputSubmit = (text) => {
    if (/clear *$/.test(text)) {
      setLines([])
      console.log(lines);
    } else {
      const localLines = lines.concat([[text, path]])
      setLines(localLines)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.linesContainer}>
        {lines.map((line, index) => (
            <div key={index} className={styles.lineWrapper}>
              <Prompt path={line[1]}/>
              <Line content={line[0]}/>
            </div>
          ))}
      </div>
      <div className={styles.inputWrapper}>
        <Prompt path={path}/>
        <Input onSubmit={handleInputSubmit}/>
      </div>
    </div>
  )
}

export default Terminal;
