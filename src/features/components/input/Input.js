import React, {useState, useRef } from "react";
import styles from './input.module.scss';

export const Input = props => {
  const ref = useRef(null)
  const {inputHandler, placeholder, val} = props
  const [value, setValue] = useState(val ? val : "")
  const [timerId, setTimerId] = useState(null)
  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => inputHandler(val), 500);
    setTimerId(timer);
  }
  const clearInput = () => {
    clearTimeout(timerId);
    setValue(val);
    ref.current.focus();
  }

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  return (
    <div className={styles.input}>
      <input type="text" className={styles.htmInput}
        value={value}
        onInput={e => onInput(e.target.value)}
        placeholder = {placeholder}
        ref={ref}
      />
      {<button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
      }
    </div>
  )
}
