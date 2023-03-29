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
  const stylesModalWrapper = showWin ? `${styles.modalWrapper} ${styles.showWindow}` : `${styles.modalWrapper} ${styles.hideWindow}`


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
      <div className={stylesModalWrapper}>
        <div className={styles.window}>
          <header className={styles.windowHead}>
            <h1 className={styles.windowName}>{placeholder}</h1>
            <button type="button" className={styles.windowCloser}
              onClick={() => winCloser()}
            >&times;</button>
          </header>
          <main className={styles.winMain}>
            { loading 
              ? <TestLoader/> 
              : <><table>
                    <thead><tr><th>1</th><th>2</th><th>3</th></tr></thead>
                  </table>
                  <div className={styles.tableContent}>
                    <table>
                      {winContent.map( (item, row) => <tr key={row} className={styles.winLine}> { Object.entries(item).map( (field, col) => <td key={col}>{field[1]}</td> ) } </tr> ) }
                    </table>
                  </div>

              </>
            }
          </main>
        </div>        
      </div>



    </div>
  )
}
