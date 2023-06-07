import React, { useState } from "react";
import styles from './sectionYear.module.scss';
import { SectionMonth } from "./sectionMonth/sectionMonth";

export const SectionYear = props => {
  const { year } = props;
  const [hide, onHide] = useState(true);

  const showHide = () => {
    onHide(!hide)
  } 

  return (
    <li className={styles.sectionYear}>
      <label htmlFor={Object.keys(year)[0]}>
        <h2 className={styles.years}>{ Object.keys(year)[0]}</h2>
      </label>

      <input type="checkbox" id={Object.keys(year)[0]}
        checked={hide}
        onChange={()=>showHide()}
      /> 

      <ul>
        { Object.values(year)[0].map((month, m_index) => <SectionMonth month={month} year={Object.keys(year)[0]} key={m_index}/>)}
      </ul>
    </li>
  )
}
