"use client";
import { useState, useRef, useEffect, useContext } from 'react';
import { PagesContext } from '../../page.js';

//sub-components
import Input from './input';
import Line from './line';
import Prompt from './prompt';
import Suggestion from './suggestion';

import styles from './terminal.module.scss';

const Terminal = ({onPageChange, className}) => {
  //refs
  const inputRef = useRef(null);
  const wrapper = useRef(null);
  //context
  const {pages, page, setPage} = useContext(PagesContext);
  //state
  const [inputStoredValue, setInputStoredValue] = useState(null); // convert this to context
  const [lines, setLines] = useState([]);
  //suggestions local
  const [pageSuggestions, setPageSuggestions] = useState([]);
  const [highlightedPageSuggestion, setHighlightedPageSuggestion] = useState(-1);
  const [pageSuggestionsActive, setPageSuggestionsActive] = useState(false);

  const commands = {
    'help': {
      expression: /^\s?help ?(\w+)? *$/,
      help: 'help; usage: help | help {command}',
      run(value) {
        const command = value.match(this.expression)[1];
        const commandNames = Object.keys(commands);
        let message;
        if (command) {
          if (commands[command]) {
            message = commands[command].help;
          } else {
            message = `unknown command: ${command}`;
          }
        } else {
          message = (<div>available commands: <br/>{'-' + commandNames.join(' -')} <br/> for more information on a particular command type help {'{'}command{'}'}</div>);
        }
        appendNewLine(value, message);
      }
    },
    'ls': {
      expression: /^\s?ls *$/,
      help: 'ls - list (files/directories); usage: ls | ls {path}',
      run(value) {
        appendNewLine(value, pageSuggestions.join(' '));
      }
    },
    'pwd': {
      expression: /^\s?pwd *$/,
      help: 'pwd - print working directory; usage: pwd',
      run(value) {
        appendNewLine(value, pages[page].pwd);
      }
    },
    'cd': {
      expression: /^\s?cd ((\w+|~)\/?|\.\.\/) *$/,
      help: 'cd - change directory; usage: cd {path} | cd ../ (back one level)',
      run(value) {
        const requestedPage = value.match(this.expression)[1];
        if (Object.keys(pages).includes(requestedPage)) {
          setPage(requestedPage);
          appendNewLine(value);
        } else if (requestedPage === '../') {
          if (pages[page].parent) {
            setPage(pages[page].parent);
          }
          appendNewLine(value);
        } else {
          appendNewLine(value, `no such file or directory: ${requestedPage}`);
        }
      },
    },
    'clear': {
      expression: /^\s?clear *$/,
      help: 'clear - clears terminal history; usage: clear',
      run() {
        setLines([]);
      }
    },
  }

  //logic
  const routeCommand = (value) => {
    for (const command in commands) {
      if (commands[command].expression.test(value)) {
        commands[command].run(value);
        return;
      }
    }
    const errorMessage = `command not found: ${value}`;
    appendNewLine(value, errorMessage);
  }

  const appendNewLine = (text, response) => {
    let localLines;
    if (response) {
      localLines = lines.concat([[text, page, false], [response, page, true]]);
    } else {
      localLines = lines.concat([[text, page, false]]);
    }
    setLines(localLines);
  }

  const resizeInput = () => {
    inputRef.current.style.height = "1px";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  }

  const typeLine = (text, speed) => {
    // lock input for no interference during message
    inputRef.current.disabled = true;
    const typingSpeed = speed ? speed : 50;
    const removalDelay = 2000;

    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
      setTimeout(() => {
        inputRef.current.value += chars[i];
        resizeInput();
      }, i * typingSpeed);
    }

    setTimeout(() => {
      for (let i = 1; i <= chars.length; i++) {
        setTimeout(() => {
          inputRef.current.value = inputRef.current.value.slice(0,-1);
          resizeInput();
        }, (typingSpeed * 0.5) * (i - 1));
      }
    }, ((chars.length - 1) * typingSpeed) + removalDelay);

    // unlock input after message appended and cleared
    setTimeout(() => {
      inputRef.current.disabled = false;
    }, (typingSpeed * (chars.length * 1.5) + removalDelay));
  }
  //effects

  useEffect(() => {
    setTimeout(() => {
      typeLine('Welcome to my portfolio, I hope you enjoy your stay')
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const calculateSuggestions = () => {
      const childPages = [];
      for (const others in pages) {
        if (pages[others].parent === page) {
          childPages.push(others);
        }
      }
      setPageSuggestions(childPages);
    }

    calculateSuggestions();
  }, [page, pages]);
  //handlers

  const handleInputSubmit = (value, setValue) => {
    setPageSuggestionsActive(false);
    routeCommand(value);
    setValue('');
  };

  const handleInputTab = (value, setValue) => {
    if (pageSuggestionsActive && pageSuggestions.length > 0) {
      let suggestionIndex = highlightedPageSuggestion + 1;
      if (suggestionIndex > (pageSuggestions.length - 1)) {
        suggestionIndex = 0;
      }
      setValue(inputStoredValue + pageSuggestions[suggestionIndex]);
      setHighlightedPageSuggestion(suggestionIndex);
    } else {
      setInputStoredValue(value);
      setPageSuggestionsActive(true);
    }
  };

  const handleInputBackspace = (value) => {
    setPageSuggestionsActive(false);
    setHighlightedPageSuggestion(-1);
  };

  const handleWrapperClick = (e) => {
    inputRef.current.focus();
  };

  //view

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
        <Prompt path={page}/>
        <Input onSubmit={handleInputSubmit}
                ref={inputRef}
                onTab={handleInputTab}
                onBackSpace={handleInputBackspace}/>
      </div>
      <Suggestion paths={pageSuggestions}
                  active={pageSuggestionsActive}
                  highlighted={highlightedPageSuggestion}/>
    </div>
  );
};

Terminal.displayName = 'Terminal';

export default Terminal;
