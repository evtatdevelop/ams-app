import React, {useState, useEffect, useRef } from "react";
import styles from './windowInput.module.scss';
import { TestLoader } from "./testLoader";


export const WindowInput = props => {
  const ref = useRef(null)
  const {inputHandler, placeholder, winContentFunc, content} = props
  const [value, setValue] = useState("")
  const [showWin, setShowWin] = useState(false)
  const [loading, setloading] = useState(true)
  const [winData, setWinData] = useState(null)
  const [searchValue, setsSarchValue] = useState('')
  // const [filtredData, setFiltredData] = useState([])


  const searhing = () => {
    let filtrded = [];
    winData.data.map(item => item.name === '1' ? filtrded.push(item) : false)
    return {'columns': winData.columns , 'data': filtrded}
  }

  const getWinContent  = () => {  
    winContentFunc({'api_key': 'TatarenkoEG'}).then(value => {
      setWinData(value)
      setloading(false)
    }) 
  }  
  useEffect(()=> getWinContent(), [])




  const clearInput = () => {
    setValue('');
    ref.current.focus();
  }

  const onFocus = () => setShowWin(true)
  const winCloser = () => setShowWin(false)

  const onSearch = (searchValue) => {
    setsSarchValue(searchValue)
  }
  const clearSearch = () => setsSarchValue('')

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylesModalWrapper = showWin ? `${styles.modalWrapper} ${styles.showWindow}` : `${styles.modalWrapper} ${styles.hideWindow}`
  const styleLoading = loading ? `${styles.loading} ${styles.showLoading}` : `${styles.loading}`
  const styleClnSearchBtn = searchValue ? `${styles.styleClnSearchBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  return (
    <div className={styles.windowInput}>
      <input type="text" className={styles.htmInput}
        value={value}
        placeholder = {placeholder}
        ref={ref}
        readOnly={true}
        onFocus={() => onFocus()}
      />
      { <div className={styleLoading}><TestLoader/></div> }
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
            
            <div className={styles.search}>
              <input type="text" placeholder = "Search"
                value={searchValue} 
                onInput={e => onSearch(e.target.value)}
              />
              <button type="button" className={styleClnSearchBtn} onClick={() => clearSearch()} aria-label="Clear Search" >&times;</button>
            </div>
            
            <main className={styles.winMain}
              onClick={(e) => console.log(e.target)}
            >
              { winData 
                ? searchValue 
                  ? content(searhing()) 
                  : content(winData)
                : <TestLoader/>
              }
            </main>
          </div>        
      </div>



    </div>
  )
}
