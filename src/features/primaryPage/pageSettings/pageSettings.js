import React, { useState } from "react";
import styles from './pageSettings.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { onToolbar, setOrderPrefers, mkPrefersData, mainpage, setNightTheme, nightTheme } from "../mainpageSlice";

export const PageSettings = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const theme = useSelector(nightTheme);
  const [show, onShow] = useState(false);
  const dispatch = useDispatch();

  const optionsPageSettings = show ? `${styles.optionsPageSettings} ${styles.show}` : `${styles.optionsPageSettings}`
  const btnPageSettings = show ? `${styles.btnPageSettings} ${styles.hide}` : `${styles.btnPageSettings}`

  const restDefault = () => {
    dispatch(setOrderPrefers(mkPrefersData(pageData)))
    localStorage.setItem(`remobedTops${userData['id']}`, JSON.stringify([])) 
    onShow(false)
  }

  const toolbar = () => {
    dispatch(onToolbar(true))
    onShow(false)
  }

  const onNightTheme = () => {
    dispatch(setNightTheme());
    onShow(false);
  }

  return (
    <nav className={styles.pageSettings}>
      {!show
       ? <button type="button" className={btnPageSettings} onClick={() => onShow(true)}>
            <FontAwesomeIcon icon={ faGear } className={styles.pickedSign} />
          </button>
       : null      
      }

      <ul className={optionsPageSettings}>
        <li><button type="button" onClick={() => toolbar()}>{dictionary['prefersSettings'][userData['lang']]}</button></li>
        <li><button type="button" onClick={() => restDefault()}>{dictionary['defaultPageSettings'][userData['lang']]}</button></li>
        <li><button type="button" onClick={() => onNightTheme()}>{ theme 
          ? dictionary['lightTheme'][userData['lang']] 
          : dictionary['nightTheme'][userData['lang']]
        }</button></li>
        <li><button type="button" onClick={() => onShow(false)}>{dictionary['cancel'][userData['lang']]}</button></li>
      </ul>
    </nav>
  )
}