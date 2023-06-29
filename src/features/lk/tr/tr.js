import React from "react";
import styles from './tr.module.scss';

export const Tr = props => {
  const { order } = props;

  // console.log(order);

  const user_fio = () => { return {__html: order.user_fio}}
  const privs = () => { return {__html: order.privs}}
  const actions = () => { return {__html: order.actions}}

  return (
    <tr className={styles.tr}>
      <td>{order.request_number}</td>
      <td>{order.date_open}</td>
      <td>{order.request_type}</td>
      <td><div dangerouslySetInnerHTML={user_fio()} /></td>
      <td><div dangerouslySetInnerHTML={privs()} /></td>
      <td><span style={{color: `${order.status_color}`}}>{order.status}</span></td>
      <td><div dangerouslySetInnerHTML={actions()} /></td>
    </tr>
  )
}
