import React from "react";
import styles from './sectionOrder.module.scss';

export const SectionOrder = props => {
  const { order } = props;

  return (
    <li className={styles.sectionOrder}>
      {`${order.request_number} ${order.request_type} ${order.api_status}`}
    </li>
  )
}
