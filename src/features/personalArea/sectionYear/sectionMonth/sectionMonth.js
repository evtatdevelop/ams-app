import React, { useState } from "react";
import styles from './sectionMonth.module.scss';
import { useSelector } from "react-redux";
import { user } from '../../../user/userSlice';
import { SectionDay } from "./sectionDay/sectionDay";

export const SectionMonth = props => {
  const { month, year } = props;
  const userData = useSelector(user);
  const [hide, onHide] = useState( new Date().getFullYear() !== +year || new Date().getMonth() !== +Object.keys(month)[0] );
  const showHide = () => {
    onHide(!hide)
  } 

  return (
    <li className={styles.sectionMonth}>
      <label htmlFor={`${year}${Object.keys(month)[0]}`} className={styles.monthLabel}>
        <h3 className={styles.months}>
          { new Date(year, Object.keys(month)[0], 1).toLocaleString(userData['lang'], { month: 'long' }) }
        </h3>        
      </label>

      <input type="checkbox" id={`${year}${Object.keys(month)[0]}`}
        checked={hide}
        onChange={()=>showHide()}
      /> 

      <ul className={styles.daysList}>
        { Object.values(month)[0].map(day => <SectionDay day={day} month={Object.keys(month)[0]} year={year} key={Object.keys(day)[0]}/>) }
      </ul>
    </li>
  )
}
