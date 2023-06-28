import React, { useEffect } from "react";
import styles from './lk.module.scss';
import { useSelector, useDispatch } from "react-redux";
import LangButton from "../mainpage/langButton";
import { user } from '../user/userSlice';
import { useParams } from "react-router-dom";
import { getMyorders, getMyarchive, getMyexecarch, setPage, sorted } from "./lkSlice";

export const Lk = () => {
  const userData = useSelector(user);
  
  const sortedData = useSelector(sorted);
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(page)) 
    if ( userData.api_key ) {
      dispatch(getMyorders(userData.api_key)) 
      dispatch(getMyarchive(userData.api_key))
      dispatch(getMyexecarch(userData.api_key))
    }
  }, [dispatch, page, userData]);

  return (
    <section className={styles.lk}>
      <h1>{page}</h1>
      <LangButton/>
      <div>
        <ul>
          {sortedData.map(order => <li>{`${order.request_number} ${order.request_type}`}</li>)}
        </ul>        
      </div>

      
    </section>
  )
}
