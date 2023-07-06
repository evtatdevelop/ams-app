import React, {useRef, useEffect, useState} from "react";
import styles from './flashInfo.module.scss';
import { useSelector } from "react-redux";
// import { user } from '../user/userSlice';
// import dictionary from '../../dictionary.json';
import { orderInfo } from "../personalAreaSlice";

export const FlasInfo = () => {
  // const userData = useSelector(user);
  const { showOI, leftOI, topOI, bottomOI, dataOI } = useSelector(orderInfo);
  
  const ref = useRef(null)
  const [h, seth] = useState(0)
  const [w, setw] = useState(0)

  // console.log(w, h);

  useEffect(()=> {
    if ( showOI ) {
      seth(ref.current ? ref.current.clientHeight : 0)
      setw(ref.current ? ref.current.clientWidth : 0)
    }
  },[showOI])

  const X = document.documentElement.clientWidth < leftOI + w ? `${leftOI}px` : `${leftOI}px`;
  const Y = document.documentElement.clientHeight < bottomOI + h ? `${topOI-h}px` : `${bottomOI}px`;
  const styleOrderInfo = showOI ? `${styles.orderInfo} ${styles.show}` : `${styles.orderInfo}`

  return (
    showOI
      ? <div className={styleOrderInfo} style={{left: X, top: Y}} ref={ref}>
        {dataOI.status}
        
        </div>
      : null
  )     
}
