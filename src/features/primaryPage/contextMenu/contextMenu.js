import React  from "react";
import styles from './contextMenu.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { getMainpage, addToPrefers, delToPrefers, onNotification, offNotification } from "../mainpageSlice";
import { user } from '../../user/userSlice';

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
    setTimeout(()=>dispatch(onNotification("Добавлено в избранное"))) 
  }

  const delPrefersHandler = () => {
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification("Удалено из избранного"))) 
  }

  const notify = () => {
    dispatch(offNotification())
    setTimeout(()=>dispatch(onNotification(about))) 
  }

  return (
    left && top 
      ? <div className={styles.contextMenu} style={{left: `${left}px`, top: `${top}px`, width: `${width}px`}}>
          <button type="button" onClick={()=>notify()}>Информация</button>
          {section === 'FAVORITES'
            ? <button type="button" onClick={()=>delPrefersHandler()}>Удалить из избранного</button>
            : <button type="button" onClick={()=>addPrefersHandler()}>Добавить в избранное</button>
          }
          
          
        </div>
      : null  

  )
}