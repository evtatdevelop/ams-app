import React from "react";
import styles from './myExec.module.scss';
import { useSelector } from "react-redux";
import { user } from '../../user/userSlice';
import { sorted } from "../lkSlice";
import dictionary from '../../../dictionary.json';

export const MyExec = () => {
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);

  const tr = (order, index) => {
    const author_fio = () => { return {__html: order.author_fio}}
    const user_fio = () => { return {__html: order.user_fio}}
    const actions = () => { return {__html: order.actions}}
    const order_dates = () => { return {__html: order.order_dates}}
    const multiroute_status = () => { return {__html: order.multiroute_status}}

  return  <tr className={styles.tr} key={index}>
      <td>{order.request_number}</td>
      <td>{order.request_type}</td>
      <td>{order.date_open}</td>
      <td><div dangerouslySetInnerHTML={author_fio()} /></td>
      <td><div dangerouslySetInnerHTML={user_fio()} /></td>
      <td><div dangerouslySetInnerHTML={order_dates()} /></td>
      <td>{order.date_close}</td>
      <td><div dangerouslySetInnerHTML={multiroute_status()} /></td>
      <td><div dangerouslySetInnerHTML={actions()} /></td>
    </tr>
  }  

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th style={{width: '75px'}}>{dictionary['lk_th_number'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_requestType'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_createDate'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_initiator'][userData['lang']]}</th>
          <th style={{width: '200px'}}>{dictionary['lk_th_targetUser'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_rqst_dates'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_submission'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_execStatRoutes'][userData['lang']]}</th>
          <th style={{width: '143px'}}>{dictionary['lk_th_action'][userData['lang']]}</th>
        </tr>            
      </thead>

      <tbody>
        {sortedData.map( (order, index) =>  tr(order, index))}            
      </tbody>
    </table>        
  )
}
