"use client";
import { useState, useRef, useEffect, forwardRef } from 'react';

import styles from './terminal.module.scss'
import windowStyles from '../../window.module.scss'

const Line = ({content}) => {
  return (
    <p>{content}</p>
  )
}

const Input = forwardRef(({ onSubmit, onTab, onBackSpace }, inputRef) => {
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
    <textarea ref={inputRef}
              className={styles.input} onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows='1'
              autoCapitalize='none'>
    </textarea>
  )

})

Input.displayName = 'Input';

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
      pwd: '~',
      // 'home': {back: '~'},
      'about': {back: '~',
                pwd: '~/about'
                },
      'contact': {back: '~',
                  pwd: '~/contact'}
    }
  }

  const [path, setPath] = useState(['~', paths['~']])
  const [suggestedPaths, setSuggestedPaths] = useState(Object.keys(path[1]).filter(path => path !== 'back' && path !== 'pwd'))
  const [suggestionsActive, setSuggestionsActive] = useState(false)
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);

  const [inputStoredValue, setInputStoredValue] = useState(null)

  const commands = {
    'help': {
      help: 'help; usage: help | help {command}'
    },
    'ls': {
      help: 'ls - list (files/directories); usage: ls | ls {path}'
    },
    'pwd': {
      help: 'pwd - print working directory; usage: pwd'
    },
    'cd': {
      help: 'cd - change directory; usage: cd {path} | cd ../ (back one level)'
    },
  }
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
    setSuggestedPaths(Object.keys(path[1]).filter(path => path !== 'back' && path !== 'pwd'))
  }, [path])

  const handleInputSubmit = (text) => {
    const clearCommand = /^\s?clear *$/;
    const cDCommand = /^\s?cd ((\w+|~)\/?|\.\.\/) *$/;
    const lsCommand = /^\s?ls *$/;
    const helpCommand = /^\s?help ?(\w+)? *$/;
    const pwdCommand = /^\s?pwd *$/

    setSuggestionsActive(false)

    if (clearCommand.test(text)) {
      setLines([])
    } else if (cDCommand.test(text)) { // cd command
      if (!tempPath) {
        // lock current suggestion in as tempPath, 
        return;
      }
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
      } else {
        const errorMessage = `no such file or directory: ${newPath}`
        appendNewLine(text, errorMessage)
      }
    } else if (lsCommand.test(text)) {
      appendNewLine(text, suggestedPaths.join(' '))
    } else if (helpCommand.test(text)) {
      const argument = text.match(helpCommand)[1];
      const commandNames = Object.keys(commands);
      let message;
      if (argument) {
        if (commands[argument]) {
          message = commands[argument].help
        } else {
          message = `unknown command: ${argument}`
        }
      } else {
        message = (<div>available commands: <br/>{'-' + commandNames.join(' -')} <br/> for more information on a particular command type help {'{'}command{'}'}</div>);
      }
      appendNewLine(text, message)
    } else if (pwdCommand.test(text)) {
      appendNewLine(text, path[1].pwd)
    } else {
      const errorMessage = `command not found: ${text}`
      appendNewLine(text, errorMessage)
    }
  }

  const wrapper = useRef(null)

  let tempPath = null;
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

  useEffect(() => {
    wrapper.current.scrollTop = wrapper.current.scrollHeight - wrapper.current.offsetHeight;
  }, [suggestionsActive])

  const handleInputBackspace = (value) => {
    setSuggestionsActive(false)
    setHighlightedSuggestion(-1)
  }

  const inputRef = useRef(null)

  const handleWrapperClick = (e) => {
    inputRef.current.focus()
  }

  return (
    <div className={windowStyles.terminalWrapper}
         onClick={handleWrapperClick}
         ref={wrapper}>
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
               ref={inputRef}
               onTab={handleInputTab}
               onBackSpace={handleInputBackspace}/>
      </div>
      <Suggestion paths={suggestedPaths} active={suggestionsActive} highlighted={highlightedSuggestion}/>
    </div>
  )
}

export default Terminal;
