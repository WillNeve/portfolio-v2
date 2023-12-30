import { textSeperationAnim } from '@/app/config/utilities';
import { useState, forwardRef, useEffect } from 'react';

import styled from 'styled-components';

const InputArea = styled.textarea`
  border: none;
  outline: none;
  background: none;
  width: 100%;
  height: fit-content;
  font-size: inherit;
  color: inherit;
  resize: none;
  height: fit-content;
  overflow: hidden;
  ${props => textSeperationAnim(props.theme.hackerGreen, .5)};
`;

const Input = forwardRef(({ onSubmit, onTab, onBackSpace }, inputRef) => {
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
    <InputArea ref={inputRef}
              onKeyDown={handleKeyDown}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows='1'
              autoCapitalize='none'>
    </InputArea>
  );
})

Input.displayName = 'Input';

export default Input;
