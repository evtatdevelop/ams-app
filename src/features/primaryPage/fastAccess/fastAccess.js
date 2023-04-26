import React, { useState }  from "react";
import styles from './fastAccess.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, onFastAccess } from "../mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import dictionary from '../../../dictionary.json';
import { user } from '../../user/userSlice'

export const FastAccess = props => {
  const [show, setShow] = useState(false)
  const pageData = useSelector(mainpage);
  const userData = useSelector(user);
  const dispatch = useDispatch();

  const onClick = (sectionId) => {
    dispatch(onFastAccess(sectionId));
    setShow(false)
  }

  return (
    <div className={styles.fastAccess}>
      {show 
        ? <ul>
            <li key='all'><button type="button" onClick={() => onClick(null)}>{dictionary['all_sections'][userData['lang']]}</button></li>
            {pageData.map(section => 
              section.prefix !== "LK" && section.prefix !== "TOP_ORDERS" && section.prefix !== "FAVORITES" 
                ? <li key={section.id}><button type="button" onClick={() => onClick(section.id)}>{section.name}</button></li>
                : null
            )}
          </ul>
        : <button type="button" className={styles.btnShowOn} onClick={()=> setShow(!show)}>
            <FontAwesomeIcon icon={ faBars } className={styles.iconButton} />
          </button>      
      }
      
    </div>
  )
}