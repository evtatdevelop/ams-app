import React  from "react";
import styles from './contextMenu.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { addToPrefers, delToPrefers, onNotification, offNotification } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';

export const ContextMenu = props => {

  const {top, left, systemId, section, about} = props.data;
  const dispatch = useDispatch();
  const userData = useSelector(user);

  // const dispatch = useDispatch();
  // console.log(top, left);
  const width= 160;
  // const X = document.documentElement.clientWidth > left - 80 + width
  //   ? left
  //   : left - width;
  // const Y = top + 10;

  // console.log(X, Y);


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

  return (
    left && top 
      ? <div className={styles.contextMenu} style={{left: `${left}px`, top: `${top}px`, width: `auto`}}>
          <button type="button" onClick={()=>notify()}>{dictionary.about[userData['lang']]}</button>
          {section === 'FAVORITES'
            ? <button type="button" onClick={()=>delPrefersHandler()}>{dictionary.del_from_preferences[userData['lang']]}</button>
            : <button type="button" onClick={()=>addPrefersHandler()}>{dictionary.add_into_preferences[userData['lang']]}</button>
          }
          
          
        </div>
      : null  

  )
}