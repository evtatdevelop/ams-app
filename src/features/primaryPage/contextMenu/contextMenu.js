import React  from "react";
import styles from './contextMenu.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { getMainpage, addToPrefers, delToPrefers } from "../mainpageSlice";
import { user } from '../../user/userSlice';

export const ContextMenu = props => {

  const {top, left, systemId} = props.data;
  const dispatch = useDispatch();
  const userData = useSelector(user);

  // const dispatch = useDispatch();
  // console.log(top, left);
  const width= 150;
  // const X = document.documentElement.clientWidth > left - 80 + width
  //   ? left
  //   : left - width;
  // const Y = top + 10;

  // console.log(X, Y);


  const addPrefersHandler = () => {
    dispatch(addToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(dispatch(getMainpage(userData.api_key))))
  }

  const delPrefersHandler = () => {
    dispatch(delToPrefers({'app12_id': userData['id'], 'asz22_id': systemId, 'api_key': userData.api_key}));
    setTimeout(() => dispatch(dispatch(getMainpage(userData.api_key))))
  }

  return (
    left && top 
      ? <div className={styles.contextMenu} style={{left: `${left}px`, top: `${top}px`, width: `${width}px`}}>
          <button type="button" onClick={()=>console.log('About')}>Информация</button>
          <button type="button" onClick={()=>addPrefersHandler()}>в "Избранное"</button>
          <button type="button" onClick={()=>delPrefersHandler()}>из "Избранного"</button>
        </div>
      : null  

  )
}