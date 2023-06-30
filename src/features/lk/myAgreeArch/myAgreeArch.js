import React from "react";
import styles from './myAgreeArch.module.scss';
import { useSelector } from "react-redux";
import { user } from '../../user/userSlice';
import { sorted } from "../lkSlice";
import dictionary from '../../../dictionary.json';

export const MyAgreeArch = () => {
  const userData = useSelector(user);
  const sortedData = useSelector(sorted);

  const tr = (order, index) => {
    const user_fio = () => { return {__html: order.user_fio}}
    const privs = () => { return {__html: order.agreed_privs}}
    const actions = () => { return {__html: order.actions}}

  return  <tr className={styles.tr} key={index}>
      <td>{order.request_number}</td>
      <td>{order.date_open}</td>
      <td>{order.request_type}</td>
      <td>{order.author_fio}</td>
      <td><div dangerouslySetInnerHTML={user_fio()} /></td>
      <td>{<div dangerouslySetInnerHTML={privs()} />}</td>
      <td><span style={{color: `${order.myagree_color}`}}>{order.myagree_status}</span></td>
      <td><span style={{color: `${order.status_color}`}}>{order.status}</span></td>
      <td><div dangerouslySetInnerHTML={actions()} /></td>
    </tr>
  }  

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th style={{width: '60px'}}>{dictionary['lk_th_number'][userData['lang']]}</th>
          <th style={{width: '80px'}}>{dictionary['lk_th_createDate'][userData['lang']]}</th>
          <th style={{width: '105px'}}>{dictionary['lk_th_requestType'][userData['lang']]}</th>
          <th style={{width: '125px'}}>{dictionary['lk_th_initiator'][userData['lang']]}</th>
          <th style={{width: '130px'}}>{dictionary['lk_th_oderUser'][userData['lang']]}</th>
          <th style={{width: '230px'}}>{dictionary['lk_th_approvals'][userData['lang']]}</th>
          <th style={{width: '100px'}}>{`${dictionary['lk_th_userStatus'][userData['lang']]}${userData['shortname']}`}</th>
          <th style={{width: '100px'}}>{dictionary['lk_th_status'][userData['lang']]}</th>
          <th style={{width: '100px'}}>{dictionary['lk_th_action'][userData['lang']]}</th>
        </tr>            
      </thead>

      <tbody>
        {sortedData.map( (order, index) =>  tr(order, index))}            
      </tbody>
    </table>        
  )
}
