import React  from "react";
import styles from './contextMenu.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { addToPrefers, delToPrefers, onNotification, offNotification, contextMenu, loadingAdd, nightTheme } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { lsGet } from "../../../helpers";

export const ContextMenu = props => {
  // const dataContextMenu = useSelector(contextMenu);
  // const {top, left, systemId, section, about, section_prefix, sysPrefix, picked} = props.data;
  const {top, left, systemId, section, about, section_prefix, sysPrefix, picked} = useSelector(contextMenu);
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const loading = useSelector(loadingAdd);
  const theme = useSelector(nightTheme);
  const width= 140;

  const addPrefers = () => {
    // dispatch(runBuisySystems(sysPrefix))
    dispatch(addToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    localTopRemove(`remobedTops${userData['id']}`, sysPrefix, 'add')
  }

  const delPrefers = (section) => {
    // dispatch(runBuisySystems(sysPrefix))
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    localTopRemove(`remobedTops${userData['id']}`, sysPrefix, 'del')
  }

  const addPrefersHandler = () => {
    if ( loading ) return
    addPrefers()
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(dictionary.added_preferences[userData['lang']]))) 
  }

  const delPrefersHandler = (section) => {
    if ( loading ) return
    delPrefers(section)
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(dictionary.removed_preferences[userData['lang']]))) 
  }

  const notify = () => {
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(about))) 
  }

  const X = document.documentElement.clientWidth < left + width ? left - width : left;

  const localTopRemove = (lsName, sysPrefix, action) => {
    let lsdata = JSON.parse(localStorage.getItem(lsName))
    if ( action === 'add') {
      // if ( lsdata.includes(sysPrefix) ) dispatch(stopLoadingAdd())
      if ( lsdata ) localStorage.setItem(lsName, JSON.stringify(lsdata.filter(item => item !== sysPrefix)))
    }
    if ( action === 'del' ) { 
      if ( lsdata ) lsdata.push(sysPrefix); else lsdata = [sysPrefix]
      localStorage.setItem(lsName, JSON.stringify(lsdata))      
    }
  }

  // const lsdata = JSON.parse(localStorage.getItem(`remobedTops${userData['id']}`))
  // const removerTop = lsdata ? lsdata : []s
  const removerTop = lsGet(`remobedTops${userData['id']}`, []);
  const styleContextMenu = theme ? `${styles.contextMenu} ${styles.dark}` : `${styles.contextMenu}`;

  return (
    left && top && !loading
      // ? <div className={styles.contextMenu} style={{left: `${X}px`, top: `${top}px`, width: `auto`}}>
      ? <div className={styleContextMenu} style={{left: `${X}px`, top: `${top}px`, width: `auto`}}>
          {about ? <button type="button" onClick={()=>notify()}>{dictionary.about[userData['lang']]}</button> : null}
          { section === 'PREFERS' || ( picked && !removerTop.includes(sysPrefix) )
            ? <button type="button" onClick={()=>delPrefersHandler(section_prefix)}>{dictionary.del_from_preferences[userData['lang']]}</button>
            : <button type="button" onClick={()=>addPrefersHandler()}>{dictionary.add_into_preferences[userData['lang']]}</button>
          }
        </div>
      : null  
  )
}

// const localTopRemove = (lsName, sysPrefix, action) => {
//   let lsdata = JSON.parse(localStorage.getItem(lsName))
//   if ( action === 'add') {
//     if ( lsdata.includes(sysPrefix) ) dispatch(stopLoadingAdd())
//     if ( lsdata ) localStorage.setItem(lsName, JSON.stringify(lsdata.filter(item => item !== sysPrefix)))
//   }
//   if ( action === 'del' ) { 
//     if ( lsdata ) lsdata.push(sysPrefix); else lsdata = [sysPrefix]
//     localStorage.setItem(lsName, JSON.stringify(lsdata))      
//   }
// }