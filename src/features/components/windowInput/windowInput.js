import React, {useState, useRef } from "react";
import styles from './windowInput.module.scss';

export const WindowInput = props => {
  const ref = useRef(null)
  const {inputHandler, placeholder} = props
  const [value, setValue] = useState("")
  const [showWin, setShowWin] = useState(false)

  const clearInput = () => {
    setValue('');
    ref.current.focus();
  }

  const winCloser = () => setShowWin(false)

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = showWin ? `${styles.window} ${styles.showWindow}` : `${styles.window} ${styles.hideWindow}`

  return (
    <div className={styles.windowInput}>
      <input type="text" className={styles.htmInput}
        value={value}
        placeholder = {placeholder}
        ref={ref}
        readOnly={true}
        onFocus={() => setShowWin(true)}
      />
      {<button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
      }

        <div className={styleSelectList}>
            <header className={styles.windowHead}>
              <h1 className={styles.windowName}>Name</h1>
              <button type="button" className={styles.windowCloser}
                onClick={() => winCloser()}
              >&times;</button>
            </header>
            <main>

            </main>
          </div>


    </div>
  )
}
