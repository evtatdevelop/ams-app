import React, { useRef } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faStar } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { onContextMenu, offContextMenu } from "../../mainpageSlice";
import { testMode } from "../../../../config";
import { user } from "../../../user/userSlice";

export const System = props => {
  // const _pathBase = testMode ? '' : `${root}/`;
  const _pathBase = testMode ? '' : ``;
  const { system, prefix } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const userData = useSelector(user);

  // useEffect(() => {
  //   sethintTextPos(document.documentElement.clientWidth - (ref.current.getBoundingClientRect().left + widthSysInfo) <= 0 ? 'right' : 'left')
  // },[]);

  const handlerContextMenu = (e) => {
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

  const lsdata = JSON.parse(localStorage.getItem(`remobedTops${userData['id']}`))
  const removerTop = lsdata ? lsdata : []

  const styleSystem = prefix === 'TOP_ORDERS' || prefix === 'PREFERS' ? `${styles.system} ${styles.topOrders}` : `${styles.system}`
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