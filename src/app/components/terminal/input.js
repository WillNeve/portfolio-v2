import { useState, forwardRef } from 'react';

import styles from './terminal.module.scss';

const Input = forwardRef(({ onSubmit, onTab, onBackSpace }, inputRef) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // console.log(e.key);
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        onSubmit(inputValue, setInputValue)
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

export default Input;
