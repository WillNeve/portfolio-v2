"use client";
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { PagesContext } from '../../page.js';

//styled
import styled, {css} from 'styled-components';

//sub-components
import Input from './Input';
import Lines from './Lines';
import Suggestions from './Suggestions';
import ToolTip from './Tooltip';
import { responsive } from '@/app/config/utilities.js';
import { boxSeperationAnim } from '@/app/config/utilities.js';

const TerminalSection = styled.div`
  ${responsive};
  position: relative;
  height: ${props => props.$expanded ? '20%' : '10%'};
  transition: height .2s ease;
  p {
    margin: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    @media (min-width: 600px) {
      width: 105%;
    }
    margin: 0 auto;
    height: 2px;
    background: ${props => props.theme.hackerGreen};
    ${props => boxSeperationAnim(props.theme.hackerGreen, .5)};
  }
`;

const TerminalWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 50px;
  padding-top: 20px;
  color: ${props => props.theme.hackerGreen};
  overflow-y: auto;
  .inner {
    border: 2px solid blue;
  }
  &::-webkit-scrollbar {
    display: block;
    background: none;
  }

  &::-webkit-scrollbar-track {
    margin-top: 20px;
    border: 2px solid ${props => props.theme.hackerGreen};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.hackerGreen};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.foregroundWhite};
}
`;

const Terminal = () => {
  //refs
  const inputRef = useRef(null);
  const tooltipRef = useRef(null);
  //context
  const {pages, page, setPage} = useContext(PagesContext);
  //state
  const [inputStoredValue, setInputStoredValue] = useState(null); // convert this to context
  const [lines, setLines] = useState([]);
  //suggestions local
  const [pageSuggestions, setPageSuggestions] = useState([]);
  const [highlightedPageSuggestion, setHighlightedPageSuggestion] = useState(-1);
  const [pageSuggestionsActive, setPageSuggestionsActive] = useState(false);

  const [terminalExpanded, setTerminalExpanded] = useState(false);

  const introActive = useRef(true);
  const typingTimeouts = useRef([]);

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
          inputRef.current.blur();
          setTerminalExpanded(false);
        } else if (requestedPage === '../') {
          if (pages[page].parent) {
            setPage(pages[page].parent);
          }
          appendNewLine(value);
          inputRef.current.blur();
          setTerminalExpanded(false);
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
    const typingSpeed = speed ? speed : 50;
    const removalDelay = 2000;

    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
      const timeout = setTimeout(() => {
        inputRef.current.value += chars[i];
        resizeInput();
      }, i * typingSpeed);
      typingTimeouts.current.push(timeout);
    }

    setTimeout(() => {
      for (let i = 1; i <= chars.length; i++) {
        const timeout = setTimeout(() => {
          inputRef.current.value = inputRef.current.value.slice(0,-1);
          resizeInput();
        }, (typingSpeed * 0.5) * (i - 1));
        typingTimeouts.current.push(timeout);
      }
    }, ((chars.length - 1) * typingSpeed) + removalDelay);

    // unlock input after message appended and cleared
    setTimeout(() => {
      introActive.current = false;
    }, (typingSpeed * (chars.length * 1.5) + removalDelay));
  }
  //effects

  const scrollToTop = useCallback(() => {
    if (!terminalExpanded) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [terminalExpanded]);

  useEffect(() => {
    scrollToTop()
  }, [terminalExpanded, scrollToTop])

  useEffect(() => {
    inputRef.current.addEventListener('blur', (e) => {
      setTerminalExpanded(false);
      scrollToTop();
    });
  }, [scrollToTop, terminalExpanded])

  useEffect(() => {
    if (page === '~') {
      setTimeout(() => {
        typeLine('Welcome to my portfolio, I hope you enjoy your stay')
      }, 500);
    }

    const clickListener = (e) => {
      if (!e.target.closest(`.${TerminalSection.styledComponentId}`)) {
        setTerminalExpanded(false);
      }
    }

    window.addEventListener('click', clickListener);

    return () => {
      window.removeEventListener('click', clickListener);
    };
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
  //view

  const handleTerminalClick = (e) => {
    setTerminalExpanded(true);
    inputRef.current.focus();

    if (introActive.current) {
      typingTimeouts.current.forEach(timeout => clearTimeout(timeout))
      inputRef.current.value = '';
      introActive.current = false;
    }
  }

  return (
    <TerminalSection $expanded={terminalExpanded}>
      <div className="inner"
           onClick={handleTerminalClick}
           onTouchStart={handleTerminalClick}>
        <TerminalWrapper>
            <Lines lines={lines}/>
            <Input  onSubmit={handleInputSubmit}
                    ref={inputRef}
                    onTab={handleInputTab}
                    onBackSpace={handleInputBackspace}
                    path={page}
                    />
            <Suggestions paths={pageSuggestions}
                        active={pageSuggestionsActive}
                        highlighted={highlightedPageSuggestion}/>
        </TerminalWrapper>
      </div>
      <ToolTip ref={tooltipRef}/>
    </TerminalSection>
  );
};

Terminal.displayName = 'Terminal';

export default Terminal;
