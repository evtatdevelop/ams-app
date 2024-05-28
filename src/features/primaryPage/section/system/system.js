import React, { useRef } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faStar } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { onContextMenu, offContextMenu, loadingAdd, nightTheme } from "../../mainpageSlice";
import { user } from "../../../user/userSlice";

export const System = props => {
  const _pathBase = ``;

  const { system, prefix } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const loading = useSelector(loadingAdd);
  const theme = useSelector(nightTheme);

  const handlerContextMenu = (e) => {
    if ( loading ) return;
    const target = e.target.getBoundingClientRect()
    dispatch(offContextMenu());
    setTimeout(() => dispatch(onContextMenu({ 
      top:            target.top, 
      left:           target.left, 
      systemId:       system.asz22_id, 
      section:        prefix, 
      about:          system.hint_text, 
      section_prefix: system.section_prefix, 
      sysPrefix:      system.system_prefix,
      picked:         system.picked
    })), 0);
  }

  const lsdata = userData['id'] ? JSON.parse(localStorage.getItem(`remobedTops${userData['id']}`)) : []
  const removerTop = lsdata ? lsdata : []

  let styleSystem = prefix === 'TOP_ORDERS' || prefix === 'PREFERS' ? `${styles.system} ${styles.topOrders}` : `${styles.system}`;
      styleSystem = theme ? `${styleSystem} ${styles.dark}` : `${styleSystem}`;
  return (
    <li  ref={ref} className={styleSystem}>
      <a href={`${system.request_url}`} className={styles.request_url} target="_balank" rel="noreferrer">
        <div className={styles.sysIcon} style={{backgroundImage: `url(${_pathBase}system_icons/${system.icon_filename})`}}></div>      
        <div className={styles.request_name}>{system.request_name}</div>         
      </a>

      <button type='button' className={styles.infoBtn} onClick={(e) => handlerContextMenu(e)} >
        <FontAwesomeIcon icon={ faEllipsisVertical } className={styles.iconButton} />
      </button>

      {system.picked && !removerTop.includes(system.system_prefix) 
        ? <FontAwesomeIcon icon={ faStar } className={styles.pickedSign} />
        : null
      }

    </li>
  )
}