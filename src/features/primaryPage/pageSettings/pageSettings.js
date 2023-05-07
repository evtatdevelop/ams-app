import React, { useState , useEffect} from "react";
import styles from './pageSettings.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

export const PageSettings = () => {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  const [show, onShow] = useState(false);

  useEffect(() => {
    setTimeout(() => onShow(false), 10000)
  });

  const optionsPageSettings = show ? `${styles.optionsPageSettings} ${styles.show}` : `${styles.optionsPageSettings}`
  const btnPageSettings = show ? `${styles.btnPageSettings} ${styles.hide}` : `${styles.btnPageSettings}`

  const restDefault = () => {
    // const lsdata = JSON.parse(localStorage.getItem(`remobedTops${userData['id']}`))
    // const removerTop = lsdata ? lsdata : []
    localStorage.removeItem(`remobedTops${userData['id']}`)
    onShow(false)
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
        <li><button type="button" onClick={() => restDefault()}>{dictionary['defaultPageSettings'][userData['lang']]}</button></li>
        {/* <li><button type="button" onClick={() => onSetting()}>{dictionary['systemsOrder'][userData['lang']]}</button></li> */}
        <li><button type="button" onClick={() => onShow(false)}>{dictionary['cancel'][userData['lang']]}</button></li>
      </ul>
    </nav>
  )
}