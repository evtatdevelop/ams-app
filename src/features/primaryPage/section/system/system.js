import React, { useState, useRef, useEffect } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

export const System = props => {
  const { system, prefix } = props;
  const [showInfo, onShowInfo] = useState(false);
  // const [hintTextPos, sethintTextPos] = useState('left');
  // const widthSysInfo = 575;
  const createMarkup = () => { return {__html: system.hint_text}}
  const ref = useRef();

  // useEffect(() => {
  //   sethintTextPos(document.documentElement.clientWidth - (ref.current.getBoundingClientRect().left + widthSysInfo) <= 0 ? 'right' : 'left')
  // },[]);


  return (
    <li  ref={ref} className={styles.system}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
        <div className={styles.request_name}>{system.request_name}</div>         
      </a>
      {/* {prefix !== 'LK'
       ? <div className={styles.information}>
          <button type='button' onClick={() => {onShowInfo(!showInfo)}}>
            <FontAwesomeIcon icon={ faInfo } className={styles.iconButton} />
          </button>
          {system.hint_text
            ? <div className={styles.infoContent}>
                <div dangerouslySetInnerHTML={createMarkup()} />
              </div>
            : null
          }

        </div>
       : null       
      } */}

    </li>
  )
}