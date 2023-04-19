import React, { useState, useRef, useEffect } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { onContextMenu, offContextMenu } from "../../mainpageSlice";
import { testMode } from "../../../../config";

export const System = props => {
  const _pathBase = testMode ? '' : 'ams/';
  const { system, prefix } = props;
  // const [showInfo, onShowInfo] = useState(false);
  // const [hintTextPos, sethintTextPos] = useState('left');
  // const widthSysInfo = 575;
  // const createMarkup = () => { return {__html: system.hint_text}}
  const ref = useRef();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   sethintTextPos(document.documentElement.clientWidth - (ref.current.getBoundingClientRect().left + widthSysInfo) <= 0 ? 'right' : 'left')
  // },[]);

  const handlerContextMenu = (e) => {
    dispatch(offContextMenu());
    setTimeout(() => dispatch(onContextMenu({ top: e.pageY, left: e.pageX, systemId: system.asz22_id, section: prefix, about: system.hint_text})), 0);
  }
  // const styleSystem = showInfo ? `${styles.system} ${styles.infoMode}` : `${styles.system}`

  return (
    <li  ref={ref} className={styles.system}>
      <a href={`${system.request_url}`} className={styles.request_url}>
        <div className={styles.sysIcon} style={{backgroundImage: `url(${_pathBase}system_icons/${system.icon_filename})`}}></div>      
        <div className={styles.request_name}>{system.request_name}</div>         
      </a>
      {/* {system.hint_text  */}
        {/* ?  */}
          <button type='button' className={styles.infoBtn}
          onClick={(e) => handlerContextMenu(e)}>
            <FontAwesomeIcon icon={ faEllipsisVertical } className={styles.iconButton} />
          </button>
          {/* {system.hint_text
           ? <div className={styles.infoContent}>
          //       <div dangerouslySetInnerHTML={createMarkup()} />
          //     </div>
          //   : null
          // }
      //  : null       
      // } */}

    </li>
  )
}