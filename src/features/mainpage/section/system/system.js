import React from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { addToPrefers, delToPrefers, onHint } from "../../mainpageSlice";
import { user } from '../../../user/userSlice';
import dictionary from '../../../../dictionary.json';
import { Link } from 'react-router-dom';
// import { mode, root } from "../../../../config";

export const System = props => {
  const { system, prefix, index } = props;
  let zIndex = 100-index;
  const dispatch = useDispatch();
  const userData = useSelector(user);
  
  // const _pathBase = testMode ? '' : `/${root}`
  // const _pathBase = mode === 'local' ? '' : `/${root}`

  const hintHandler = (e) => dispatch(onHint({text: system.hint_text, top: e.pageY, left: e.pageX}))

  const addPrefersHandler = (e) => {
    dispatch(addToPrefers({'app12_id': userData['id'], 'asz22_id': system.asz22_id, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(onHint({text: `<div style="padding: 7px 35px 7px 7px;">${dictionary['added_preferences'][userData['lang']]}</div>`, top: e.pageY, left: e.pageX})))
  }

  const delPrefersHandler = (e) => {
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': system.asz22_id, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(onHint({text: `<div style="padding: 7px 35px 7px 7px;">${dictionary['removed_preferences'][userData['lang']]}</div>`, top: e.pageY, left: e.pageX})))
  }

  return (
    <li className={styles.system} style={{zIndex: `${zIndex}`}}>
      {prefix === 'LK' && ( system.system_prefix === "LK_01" || system.system_prefix === "LK_03" || system.system_prefix === "LK_07" || system.system_prefix === "LK_06" )
        // ?  <Link to = {`${_pathBase}/lknew/${system.request_url.split('/')[2]}`} className={styles.request_url}>
        ?  <Link to = {`/lk/${system.request_url.split('/')[2]}`} className={styles.request_url}>
            <div>
              <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
              <div className={styles.request_name}>{system.request_name}</div>         
            </div>
            {system.cnt ? <div className={styles.cnt}>{system.cnt}</div> : null}              
          </Link>
        : <a href={`${system.request_url}`} className={styles.request_url}>
            <div>
              <div className={styles.sysIcon} style={{backgroundImage: `url(./system_icons/${system.icon_filename})`}}></div>      
              <div className={styles.request_name}>{system.request_name}</div>         
            </div>
            {system.cnt ? <div className={styles.cnt}>{system.cnt}</div> : null}
          </a>
      }
      



      {prefix !== 'LK'
       ? <nav className={styles.systemNav}>
          <div>
            <button type='button' 
              onClick={(e) => hintHandler(e)}
            >
              <FontAwesomeIcon icon={ faQuestion } className={styles.iconButton} />
            </button>
            <div className={styles.hint}>{dictionary['request_info'][userData['lang']]}</div>          
          </div>
          <div>
            {prefix === 'FAVORITES'
              ? <>
                  <button type='button' onClick={(e)=>delPrefersHandler(e)}>
                    <FontAwesomeIcon icon={ faMinus } className={styles.iconButton} />
                  </button>
                  <div className={styles.hint}>{dictionary['del_from_preferences'][userData['lang']]}</div>
                </>
              : <>
                  <button type='button' onClick={(e)=>addPrefersHandler(e)}  >
                    <FontAwesomeIcon icon={ faPlus } className={styles.iconButton} />
                  </button>
                  <div className={styles.hint}>{dictionary['add_into_preferences'][userData['lang']]}</div>
                </>
            }       
          </div>
        </nav>
       : null       
      }
    </li>
  )
}