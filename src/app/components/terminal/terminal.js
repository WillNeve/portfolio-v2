"use client";
import { useState, useRef, useEffect } from 'react';

import styles from './terminal.module.scss'
import windowStyles from '../../window.module.scss'

const Line = ({content}) => {
  return (
    <p>{content}</p>
  )
}

const Input = ({ onSubmit, onTab, onBackSpace }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // console.log(e.key);
    switch (e.key) {
      case 'Enter':
        onSubmit(inputValue)

        setInputValue('')
        break;
      case 'Tab':
        e.preventDefault()
        onTab(inputValue, setInputValue)
        break;
      case 'Backspace':
        onBackSpace(inputValue)
        break;
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

const Suggestion = ({paths, active, highlighted}) => {
  return (
    <div className={`${styles.suggestionBox} ${(active ? styles.visible : '')}`}>
      {paths.map((path, index) => (
        <p key={index} className={`${styles.suggestion} ${(index === highlighted ? styles.highlighted : '')}`}>{path}</p>
      ))}
    </div>
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


const Terminal = ({onPageChange}) => {
  const [lines, setLines] = useState([])
  const paths = {
    '~': {
      // 'home': {back: '~'},
      'about': {back: '~'},
      'contact': {back: '~'}
    }
  }
  const [path, setPath] = useState(['~', paths['~']])
  const [suggestedPaths, setSuggestedPaths] = useState(Object.keys(paths['~']))
  const [suggestionsActive, setSuggestionsActive] = useState(false)
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
  const [inputStoredValue, setInputStoredValue] = useState(null)

  const appendNewLine = (text, response) => {
    let localLines;
    if (response) {
      localLines = lines.concat([[text, path[0], false], [response, path[0], true]])
    } else {
      localLines = lines.concat([[text, path[0], false]])
    }
    setLines(localLines)
  }

  useEffect(() => {
    setSuggestedPaths(Object.keys(path[1]).filter(path => path !== 'back'))
  }, [path])

  const handleInputSubmit = (text) => {
    const clearCommand = /^\s?clear *$/;
    const cDCommand = /^\s?cd ((\w+|~)\/?|\.\.\/) *$/;
    const lsCommand = /^\s?ls *$/;
    setSuggestionsActive(false)

    if (clearCommand.test(text)) {
      setLines([])
    } else if (cDCommand.test(text)) { // cd command
      const newPath = text.match(cDCommand)[1]
      if (newPath === '../') {
        appendNewLine(text)
        const previousPath = path[1].back
        if (path[1].back) {
          setPath([previousPath, paths[previousPath]])
          onPageChange(previousPath)
        }
      } else if (suggestedPaths.includes(newPath)) {
        appendNewLine(text)
        setPath([newPath, path[1][newPath]])
        onPageChange(newPath)
        console.log(path);
      } else {
        const errorMessage = `no such file or directory: ${newPath}`
        appendNewLine(text, errorMessage)
      }
    } else if (lsCommand.test(text)) {
      appendNewLine(text, suggestedPaths.join(' '))
    } else {
      const errorMessage = `command not found: ${text}`
      appendNewLine(text, errorMessage)
    }
  }

  const handleInputTab = (value, setValue) => {
    if (suggestionsActive && suggestedPaths.length > 0) {
      let localHighlightedSuggestion = highlightedSuggestion + 1
      if (localHighlightedSuggestion > (suggestedPaths.length - 1)) {
        localHighlightedSuggestion = 0
      }
      setValue(inputStoredValue + suggestedPaths[localHighlightedSuggestion])
      setHighlightedSuggestion(localHighlightedSuggestion);
    } else {
      setInputStoredValue(value);
      setSuggestionsActive(true)
      // setSuggestedPaths(Object.keys(path[1]).filter(path => path !== 'back'))
    }
  }

  const handleInputBackspace = (value) => {
    setSuggestionsActive(false)
    setHighlightedSuggestion(-1)
  }

  return (
    <div className={windowStyles.terminalWrapper}>
      <div className={styles.linesContainer}>
        {lines.map((line, index) => (
            <div key={index} className={styles.lineWrapper}>
              {line[2] ? ('') : (<Prompt path={line[1]}/>)}
              <Line content={line[0]}/>
            </div>
          ))}
      </div>
      <div className={styles.inputWrapper}>
        <Prompt path={path[0]}/>
        <Input onSubmit={handleInputSubmit}
               onTab={handleInputTab}
               onBackSpace={handleInputBackspace}/>
      </div>
      <Suggestion paths={suggestedPaths} active={suggestionsActive} highlighted={highlightedSuggestion}/>
    </div>
  )
}

export default Terminal;
