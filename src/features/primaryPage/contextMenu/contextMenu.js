import React  from "react";
import styles from './contextMenu.module.scss';
// import { useDispatch } from "react-redux";

export const ContextMenu = props => {

  const {top, left} = props.data;
  // const dispatch = useDispatch();
  console.log(top, left);
  const width= 150;
  const X = document.documentElement.clientWidth > left - 80 + width
    ? left
    : left - width;
  const Y = top + 10;

  console.log(X, Y);

  return (
    left && top 
      ? <div className={styles.contextMenu} style={{left: `${left}px`, top: `${top}px`, width: `${width}px`}}>
          <button type="button">Информация</button>
          <button type="button">в "Избранное"</button>
        </div>
      : null  

  )
}