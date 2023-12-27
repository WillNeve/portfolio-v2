"use client";
import { useState, useRef, useEffect } from 'react';

//sub-components
import Input from './input';
import Line from './line';
import Prompt from './prompt';
import Suggestion from './suggestion';

import styles from './terminal.module.scss';

const Terminal = ({onPageChange, className}) => {
  const [lines, setLines] = useState([]);

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

  const [path, setPath] = useState(['~', paths['~']]);
  const [suggestedPaths, setSuggestedPaths] = useState(Object.keys(path[1]).filter(path => path !== 'back' && path !== 'pwd'));
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
  const [formedPath, setFormedPath] = useState(['', false]); // path, ready

  const [inputStoredValue, setInputStoredValue] = useState(null);

  const commands = {
    'help': {
      help: 'help; usage: help | help {command}',
    },
    'ls': {
      help: 'ls - list (files/directories); usage: ls | ls {path}',
    },
    'pwd': {
      help: 'pwd - print working directory; usage: pwd',
    },
    'cd': {
      help: 'cd - change directory; usage: cd {path} | cd ../ (back one level)',
    },
    'clear': {
      help: 'clear - clears terminal history; usage: clear',
    },
  }
  const appendNewLine = (text, response) => {
    let localLines;
    if (response) {
      localLines = lines.concat([[text, path[0], false], [response, path[0], true]]);
    } else {
      localLines = lines.concat([[text, path[0], false]]);
    }
    setLines(localLines);
  }

  useEffect(() => {
    if (formedPath[0] && formedPath[1]) {
      setSuggestedPaths(Object.keys(path[1][formedPath[0]]).filter(path => path !== 'back' && path !== 'pwd'));
    } else {
      setSuggestedPaths(Object.keys(path[1]).filter(path => path !== 'back' && path !== 'pwd'));
    }
  }, [path, formedPath]);

  const handleInputSubmit = (value, setValue) => {
    const clearCommand = /^\s?clear *$/;
    const cDCommand = /^\s?cd ((\w+|~)\/?|\.\.\/) *$/;
    const lsCommand = /^\s?ls *$/;
    const helpCommand = /^\s?help ?(\w+)? *$/;
    const pwdCommand = /^\s?pwd *$/;

    setSuggestionsActive(false);

    if (clearCommand.test(value)) {
      setLines([]);
    } else if (cDCommand.test(value)) { // cd command
      if (highlightedSuggestion !== -1 && suggestionsActive)  {
        // lock selection to formedPath and back out
        setSuggestionsActive(false);
        setFormedPath([suggestedPaths[highlightedSuggestion], true]);
        return;
      }

      if (formedPath[1]) console.log(`'${formedPath[0]}'`);
      const newPath = formedPath[0] && formedPath[1] ? formedPath[0] : value.match(cDCommand)[1];
      if (newPath === '../') {
        appendNewLine(value);
        const previousPath = path[1].back;
        if (path[1].back) {
          setPath([previousPath, paths[previousPath]]);
          onPageChange(previousPath);
        }
      } else if (Object.keys(path[1]).includes(newPath)) {
        appendNewLine(value);
        setPath([newPath, path[1][newPath]]);
        onPageChange(newPath);
      } else {
        const errorMessage = `no such file or directory: ${newPath}`;
        appendNewLine(value, errorMessage);
      }
      setFormedPath(['', false]);
      } else if (lsCommand.test(value)) {
        appendNewLine(value, suggestedPaths.join(' '));
      } else if (helpCommand.test(value)) {
        const argument = value.match(helpCommand)[1];
        const commandNames = Object.keys(commands);
        let message;
        if (argument) {
          if (commands[argument]) {
            message = commands[argument].help;
          } else {
            message = `unknown command: ${argument}`;
          }
        } else {
          message = (<div>available commands: <br/>{'-' + commandNames.join(' -')} <br/> for more information on a particular command type help {'{'}command{'}'}</div>);
        }
        appendNewLine(value, message);
      } else if (pwdCommand.test(value)) {
        appendNewLine(value, path[1].pwd);
      } else {
        const errorMessage = `command not found: ${value}`;
        appendNewLine(value, errorMessage);
      }
      setValue('');
  };

  const wrapper = useRef(null);

  const handleInputTab = (value, setValue) => {
    if (suggestionsActive && suggestedPaths.length > 0) {
      let localHighlightedSuggestion = highlightedSuggestion + 1;
      if (localHighlightedSuggestion > (suggestedPaths.length - 1)) {
        localHighlightedSuggestion = 0;
      }
      setValue(inputStoredValue + suggestedPaths[localHighlightedSuggestion]);
      setHighlightedSuggestion(localHighlightedSuggestion);
    } else {
      setInputStoredValue(value);
      setSuggestionsActive(true);
      // setSuggestedPaths(Object.keys(path[1]).filter(path => path !== 'back'))
    }
  };

  useEffect(() => {
    wrapper.current.scrollTop = wrapper.current.scrollHeight - wrapper.current.offsetHeight;
  }, [suggestionsActive]);

  const handleInputBackspace = (value) => {
    setSuggestionsActive(false);
    setHighlightedSuggestion(-1);
  };

  const inputRef = useRef(null);

  const handleWrapperClick = (e) => {
    inputRef.current.focus();
  };

  return (
    <div className={className}
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
  );
};

export default Terminal;
