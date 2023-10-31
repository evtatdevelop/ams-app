import React from "react";
import styles from './fastAccess.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, onFastAccess, onFastShow, fastshow, nightTheme } from "../mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import dictionary from '../../../dictionary.json';
import { user } from '../../user/userSlice'

export const FastAccess = props => {
  const pageData = useSelector(mainpage);
  const userData = useSelector(user);
  const show = useSelector(fastshow);
  const theme = useSelector(nightTheme);
  const dispatch = useDispatch();

  const onClick = (sectionId) => {
    dispatch(onFastAccess(sectionId));
    dispatch(onFastShow(false));
  }

  const stylefastAccess = theme ? `${styles.fastAccess} ${styles.dark}` : `${styles.fastAccess}`;
  const fastAccessMenu = show ? `${styles.fastAccessMenu} ${styles.show}` : `${styles.fastAccessMenu}`
  const btnShowOn = show ? `${styles.btnShowOn} ${styles.hide}` : `${styles.btnShowOn}`

  return (
    // <div className={styles.fastAccess}>
    <div className={stylefastAccess}>

        <ul className={fastAccessMenu}>
          <li key='all'><button type="button" onClick={() => onClick(null)}>{dictionary['all_sections'][userData['lang']]}</button></li>
          {pageData.map(section => 
            section.prefix !== "LK" && section.prefix !== "TOP_ORDERS" && section.prefix !== "FAVORITES" 
              ? <li key={section.id}><button type="button" onClick={() => onClick(section.id)}>{section.name}</button></li>
              : null
          )}
        </ul>

        <button type="button" className={btnShowOn} onClick={()=> dispatch(onFastShow(!show))}>
            <FontAwesomeIcon icon={ faBars } className={styles.iconButton} />
        </button>      

      
    </div>
  )
}