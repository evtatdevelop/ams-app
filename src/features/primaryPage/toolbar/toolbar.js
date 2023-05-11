import React, { useEffect } from "react";
import styles from './toolbar.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { mainpage, setOrderPrefers, orderPrefers, onToolbar } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { lsGet } from "../../../helpers";

export const Toolbar = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setOrderPrefers(lsGet(`orderPrefers${userData['id']}`, [])))
  // }, [dispatch, userData]);

  return (
    <div className={styles.toolbar}>
      <button type="button" onClick={() => dispatch(onToolbar(false))}>Close</button>
    </div>
  )
}

