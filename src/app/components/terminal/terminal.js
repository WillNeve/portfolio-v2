"use client";
import { useState, useRef } from 'react';

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
              rows='1'
              autoCapitalize='none'>
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
  const [lines, setLines] = useState([])
  const [path, setPath] = useState('home')
  const paths = ['~', 'home', 'test']

  const appendNewLine = (text, response) => {
    let localLines;
    if (response) {
      localLines = lines.concat([[text, path, false], [response, path, true]])
    } else {
      localLines = lines.concat([[text, path, false]])
    }
    setLines(localLines)
  }


  const handleInputSubmit = (text) => {
    const clearCommand = /clear *$/;
    const cDCommand = /^\s?cd (\w+\/?)$/;

    if (clearCommand.test(text)) {
      setLines([])
    } else if (cDCommand.test(text)) { // cd command
      const newPath = text.match(cDCommand)[1];

      if (paths.includes(newPath)) {
        appendNewLine(text)
        setPath(newPath)
      } else {
        const errorMessage = `no such file or directory: ${newPath}`
        appendNewLine(text, errorMessage)
      }
    } else {
      const errorMessage = `command not found: ${text}`
      appendNewLine(text, errorMessage)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.linesContainer}>
        {lines.map((line, index) => (
            <div key={index} className={styles.lineWrapper}>
              {line[2] ? ('') : (<Prompt path={line[1]}/>)}
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
