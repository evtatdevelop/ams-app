import React, { useEffect }  from "react";
import styles from './notification.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { notification, offNotification } from "../mainpageSlice";

export const Notification = () => {
  const dispatch = useDispatch();
  const notice = useSelector(notification);
  const createMarkup = () => { return {__html: notice}}

  useEffect(() => {  
    setTimeout(() => dispatch(offNotification()), 30000)
  }, [dispatch]);

  return (
    <div className={styles.notification} >
      <button type="button" className={styles.notiCloser} onClick={()=>dispatch(offNotification())}>&times;</button>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}