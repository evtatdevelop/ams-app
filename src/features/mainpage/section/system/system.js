import React from "react";
import styles from './system.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { addToPrefers, delToPrefers, onHint } from "../../mainpageSlice";
import { user } from '../../../user/userSlice';

export const System = props => {
  const { system, prefix, index } = props;
  let zIndex = 100-index;
  const dispatch = useDispatch();
  const userData = useSelector(user);

  const hintHandler = (e) => dispatch(onHint({text: system.hint_text, top: e.pageY, left: e.pageX}))

  const addPrefersHandler = (e) => {
    dispatch(addToPrefers({'app12_id': userData['id'], 'asz22_id': system.asz22_id, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(onHint({text: '<div style="padding: 7px 35px 7px 7px;">Добавлено в избранное</div>', top: e.pageY, left: e.pageX})))
  }

  const delPrefersHandler = (e) => {
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': system.asz22_id, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(onHint({text: '<div style="padding: 7px 35px 7px 7px;">Удалено из избранного</div>', top: e.pageY, left: e.pageX})))
  }

  return (
    <li className={styles.system} style={{zIndex: `${zIndex}`}}>
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
            {prefix === 'FAVORITES'
              ? <>
                  <button type='button' onClick={(e)=>delPrefersHandler(e)}>
                    <FontAwesomeIcon icon={ faMinus } className={styles.iconButton} />
                  </button>
                  <div className={styles.hint}>Удалить из избранного</div>
                </>
              : <>
                  <button type='button' onClick={(e)=>addPrefersHandler(e)}  >
                    <FontAwesomeIcon icon={ faPlus } className={styles.iconButton} />
                  </button>
                  <div className={styles.hint}>Добавить в избранное</div>
                </>
            }       
          </div>
        </nav>
       : null       
      }
    </li>
  )
}