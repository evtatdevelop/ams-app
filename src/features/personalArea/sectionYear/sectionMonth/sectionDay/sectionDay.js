import React, { useState }  from "react";
import styles from './sectionDay.module.scss';
import { SectionOrder } from "./sectionOrder/sectionOrder";

export const SectionDay = props => {
  const { day, month, year } = props;
  const [hide, onHide] = useState(true);
  const showHide = () => {
    onHide(!hide)
  } 

  return (
    <li className={styles.sectionDay}>
      <label htmlFor={`${year}${month}${Object.keys(day)[0]}`}>
        <h4 className={styles.days}>{ new Date(+Object.keys(day)[0]).getDate() }</h4>
      </label>
      
      <input type="checkbox" id={`${year}${month}${Object.keys(day)[0]}`}
        checked={hide}
        onChange={()=>showHide()}
      /> 

      <ul>
        { Object.values(day)[0].map(order => <SectionOrder order={order} key={`${order.order_type}${order.order_id}`}/>) }
      </ul>
    </li>

  )
}
