import { textSeperationAnim } from '@/app/config/utilities';
import { useState, forwardRef, useEffect } from 'react';

import styled, {css} from 'styled-components';

import Prompt from './Prompt';

const InputWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  ${props => textSeperationAnim(props.theme.hackerGreen, 0.5)};
`;

const InputArea = styled.textarea`
  border: none;
  outline: none;
  background: none;
  width: 100%;
  height: fit-content;
  font-size: inherit;
  color: ${props => props.theme.hackerGreen};
  resize: none;
  height: fit-content;
  overflow: hidden;
  opacity: 1;
  &::placeholder {
    opacity: 1;
  }
  ${props => textSeperationAnim(props.theme.hackerGreen, .5)};
`;

const Input = forwardRef(({ onSubmit, onTab, onBackSpace, path }, inputRef) => {
  const [inputValue, setInputValue] = useState('');

  const resize = () => {
    inputRef.current.style.height = "1px";

    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  }

  const handleKeyDown = (e) => {
    // console.log(e.key);

    resize();
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onSubmit(inputValue, setInputValue);
        break;
      case 'Tab':
        e.preventDefault();
        onTab(inputValue, setInputValue);
        break;
      case 'Backspace':
        onBackSpace(inputValue);
        break;
    }
  }

  return (
    <InputWrapper>
      <Prompt path={path}/>
      <InputArea ref={inputRef}
                onKeyDown={handleKeyDown}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows='1'
                aria-label="Terminal Bar Input Field"
                autoCapitalize='none'>
      </InputArea>
    </InputWrapper>
  );
})

Input.displayName = 'Input';

export default Input;
