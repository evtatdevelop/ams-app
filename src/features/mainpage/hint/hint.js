import React  from "react";
import styles from './hint.module.scss';
import { useDispatch } from "react-redux";
import { clearHint } from "../mainpageSlice";

export const Hint = props => {

  const {text, top, left} = props.data;
  const createMarkup = () => { return {__html: text}}
  const dispatch = useDispatch();
  const widthHint = 575;
  const X = document.documentElement.clientWidth > left - 80 + widthHint
    ? left - 80
    : left - 20 - widthHint;
  const Y = top + 30;

  return (
    text
      ? <div className={styles.hint} style={{left: `${X}px`, top: `${Y}px`, width: `auto`}}>
          <div dangerouslySetInnerHTML={createMarkup()} />
          <button type='button' className={styles.colserInfo} onClick={() => {dispatch(clearHint())}} >&times;</button>      
        </div>
      : null  

  )
}