import React, {useState, useRef } from "react";
import styles from './windowInput.module.scss';
import { TestLoader } from "./testLoader";
import { getContractorsData } from "../../workplace/workplaceSliceAPI";
import { getServersData } from "../../resources/resourcesSliceAPI";

export const WindowInput = props => {
  const ref = useRef(null)
  const {inputHandler, placeholder, winContentFunc} = props
  const [value, setValue] = useState("")
  const [showWin, setShowWin] = useState(false)
  const [loading, setloading] = useState(false)
  const [winContent, setWinContent] = useState([])

  const clearInput = () => {
    setValue('');
    ref.current.focus();
  }

  const onFocus = () => {
    getWinContent()
    setShowWin(true)
    setloading(true)
  }

  const winCloser = () => setShowWin(false)

    const getWinContent  = () => {
      winContentFunc({'api_key': 'TatarenkoEG'}).then(value => {
      setWinContent(value)
      setloading(false)
    }) 
  }

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleWindow = showWin ? `${styles.window} ${styles.showWindow}` : `${styles.window} ${styles.hideWindow}`
  
  return (
    <div className={styles.windowInput}>
      <input type="text" className={styles.htmInput}
        value={value}
        placeholder = {placeholder}
        ref={ref}
        readOnly={true}
        onFocus={() => onFocus()}
      />
      {<button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
      }

      <div className={styleWindow}>
        <header className={styles.windowHead}>
          <h1 className={styles.windowName}>{placeholder}</h1>
          <button type="button" className={styles.windowCloser}
            onClick={() => winCloser()}
          >&times;</button>
        </header>
        <main className={styles.winContent}>
          { loading 
            ? <TestLoader/> 
            : winContent.map( (item, row) => {
              return <div key={row} className={styles.winLine}>
                { Object.entries(item).map( (field, col) => <div key={col}>{field[1]}</div> ) }
              </div>
            }) 
          }
        </main>
      </div>


    </div>
  )
}