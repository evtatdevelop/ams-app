import React, {useState, useRef } from "react";
import styles from './input.module.scss';

export const Input = props => {
  const ref = useRef(null)
  const {inputHandler, placeholder} = props

  const [value, setValue] = useState('')
  const [timerId, setTimerId] = useState(null)

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => inputHandler(val), 500);
    setTimerId(timer);
  }

  const clearInput = () => {
    clearTimeout(timerId);
    setValue('');
    ref.current.focus();
  }

  return (
    <div className={styles.input}>
      <input type="text" className={styles.htmInput}
        value={value}
        onInput={e => onInput(e.target.value)}
        placeholder = {placeholder}
        ref={ref}
      />
      {value 
        ? <button type="button" className={styles.clearBtn}
          onClick={() => clearInput()}
          >&times;</button>
        : null
      }
    </div>
  )
}
