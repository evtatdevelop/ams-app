import React  from "react";
import styles from './notification.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { notification, offNotification } from "../mainpageSlice";

export const Notification = props => {

  // const {} = props.data;
  const dispatch = useDispatch();
  const notice = useSelector(notification);
  const createMarkup = () => { return {__html: notice}}
  return (
    <div className={styles.notification} >
      <button type="button" onClick={()=>dispatch(offNotification())}>&times;</button>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  )
}