import React, { useState, useRef, useEffect } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const System = props => {
  const { system, prefix, index } = props;
  const zIndex = 999-index;
  const [showInfo, onShowInfo] = useState(false);

  const createMarkup = () => { return {__html: system.hint_text}}
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current ? ref.current.getBoundingClientRect() : null)
  });

  return (
    <li  ref={ref} className={styles.system} style={{zIndex: `${zIndex}`}}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div>
          <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
          <div className={styles.request_name}>{system.request_name}</div>         
        </div>

        {system.cnt ? <div className={styles.cnt}>{system.cnt}</div> : null}
      
      </a>
      {prefix !== 'LK'
       ? <nav className={styles.systemNav}>
          <div>
            <button type='button' onClick={() => onShowInfo(!showInfo)}>
              <FontAwesomeIcon icon={ faQuestion } className={styles.iconButton} />
            </button>
            <div className={styles.hint}>Информация о запросе / заявке</div>          
          </div>
          <div>
            <button type='button'>
              <FontAwesomeIcon icon={ faPlus } className={styles.iconButton} />
            </button>
            <div className={styles.hint}>Добавить в избранное</div>          
          </div>
        </nav>
       : null       
      }
      {system.hint_text && showInfo
        ? <div className={styles.sysInfo}>
            <div dangerouslySetInnerHTML={createMarkup()} />
            <button type='button' className={styles.colserInfo} onClick={() => onShowInfo(false)} >&times;</button>
          </div>
        : null
      }
    </li>
  )
}