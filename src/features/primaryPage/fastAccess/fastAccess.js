import React from "react";
import styles from './fastAccess.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, onFastAccess, onFastShow, fastshow } from "../mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import dictionary from '../../../dictionary.json';
import { user } from '../../user/userSlice'

export const FastAccess = props => {
  const pageData = useSelector(mainpage);
  const userData = useSelector(user);
  const show = useSelector(fastshow);
  const dispatch = useDispatch();

  const onClick = (sectionId) => {
    dispatch(onFastAccess(sectionId));
    dispatch(onFastShow(false));
  }

  const fastAccessMenu = show ? `${styles.fastAccessMenu} ${styles.show}` : `${styles.fastAccessMenu}`

  return (
    <div className={styles.fastAccess}>

        <ul className={fastAccessMenu}>
            <li key='all'><button type="button" onClick={() => onClick(null)}>{dictionary['all_sections'][userData['lang']]}</button></li>
            {pageData.map(section => 
              section.prefix !== "LK" && section.prefix !== "TOP_ORDERS" && section.prefix !== "FAVORITES" 
                ? <li key={section.id}><button type="button" onClick={() => onClick(section.id)}>{section.name}</button></li>
                : null
            )}
          </ul>

        <button type="button" className={styles.btnShowOn} onClick={()=> dispatch(onFastShow(!show))}>
            <FontAwesomeIcon icon={ faBars } className={styles.iconButton} />
          </button>      

      
    </div>
  )
}