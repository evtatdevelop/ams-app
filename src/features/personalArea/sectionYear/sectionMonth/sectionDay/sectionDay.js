import React, { useState }  from "react";
import styles from './sectionDay.module.scss';
import { SectionOrder } from "./sectionOrder/sectionOrder";
// import { getDate } from "../../../../../helpers";
import { user } from '../../../../user/userSlice';
import { useSelector } from "react-redux";
import { everyClose } from "../../../personalAreaSlice";

export const SectionDay = props => {
  const { day, month, year, hideDay } = props;
  const userData = useSelector(user);
  const daysClose = useSelector(everyClose);
  const [hide, onHide] = useState( 
    !Object.values(day)[0].some( order => order.api_status === 'inprogress' )
   );
  
  const showHide = () => onHide(!hide)

  const getDateString = () => {
    const time = new Date(+Object.keys(day)[0])
    let d = time.getDate()
    const wd = time.toLocaleString(userData['lang'], { weekday: 'short' })
    d = d > 9 ? d : `0${d}`
    return `${wd}, ${d}`
  }

  return (
    <>{ !hideDay
      ? <li className={styles.sectionDay}>
          <label htmlFor={`${year}${month}${Object.keys(day)[0]}`} className={styles.dayLabel}>
            <h4 className={styles.days}>{ getDateString() }</h4>
          </label>
          
          <input type="checkbox" id={`${year}${month}${Object.keys(day)[0]}`}
            checked={hide && daysClose}
            onChange={()=>showHide()}
          /> 

          <ul className={styles.orderListPA}>
            {/* { Object.values(day)[0].map(order => <SectionOrder order={order} key={`${order.order_type}${order.order_id}`} hide={hide && daysClose}/>) } */}
            { Object.values(day)[0].map((order, index) => <SectionOrder order={order} key={index} hide={hide && daysClose}/>) }
          </ul>
        </li>
      : null
    }</>




  )
}
