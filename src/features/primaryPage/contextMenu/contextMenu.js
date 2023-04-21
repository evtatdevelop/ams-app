import React  from "react";
import styles from './contextMenu.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { addToPrefers, delToPrefers, onNotification, offNotification } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';

export const ContextMenu = props => {

  const {top, left, systemId, section, about, section_prefix} = props.data;
  const dispatch = useDispatch();
  const userData = useSelector(user);
  // const width= 160;

  const addPrefersHandler = () => {
    dispatch(addToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(dictionary.added_preferences[userData['lang']]))) 
  }

  const delPrefersHandler = () => {
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(dictionary.removed_preferences[userData['lang']]))) 
  }

  const notify = () => {
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(about))) 
  }

  console.log(section_prefix);

  return (
    left && top 
      ? <div className={styles.contextMenu} style={{left: `${left}px`, top: `${top}px`, width: `auto`}}>
          <button type="button" onClick={()=>notify()}>{dictionary.about[userData['lang']]}</button>
          {/* {section === 'FAVORITES' || section === 'PREFERS' */}
          {section_prefix !== 'TOP_ORDERS' 
            ? section === 'PREFERS'
              ? <button type="button" onClick={()=>delPrefersHandler()}>{dictionary.del_from_preferences[userData['lang']]}</button>
              : <button type="button" onClick={()=>addPrefersHandler()}>{dictionary.add_into_preferences[userData['lang']]}</button>
            : null
          }
        </div>
      : null  
  )
}