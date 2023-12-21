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



const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [path, setPath] = useState('home')

  const handleInputSubmit = (text) => {
    const localLines = lines.concat([text])
    setLines(localLines)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.linesContainer}>
        {lines.map((line, index) => (
            <Line key={index} content={line}/>
          ))}
      </div>
      <Input onSubmit={handleInputSubmit}/>
    </div>
  )
}

export default Terminal;
