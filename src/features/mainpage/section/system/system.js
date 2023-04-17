import React, { useState, useRef, useEffect } from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { onHint } from "../../mainpageSlice";

export const System = props => {
  const { system, prefix, index } = props;
  let zIndex = 100-index;
  // const [hintTextPos, sethintTextPos] = useState({});
  const ref = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   sethintTextPos(ref.current.getBoundingClientRect())
  // },[]);

  const hintHandler = (e) => {
    console.log(e);
    dispatch(onHint({text: system.hint_text, top: e.pageY, left: e.pageX}))
  }

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
            <button type='button' 
              onClick={(e) => hintHandler(e)}
            >
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
    </li>
  )
}