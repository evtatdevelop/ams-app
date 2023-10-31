import React from "react";
import styles from './section.module.scss';
import { System } from './system/system';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { loadingAdd, nightTheme } from "../mainpageSlice";
import { useSelector } from "react-redux";
import SystemLoader from "./systemLoader";

export const Section = props => {
  const { section } = props;
  const loading = useSelector(loadingAdd);
  const theme = useSelector(nightTheme);

  const styleSidebar = theme ? `${styles.section} ${styles.dark}` : `${styles.section}`;

  return (
    // <li className={styles.section} id={section.id}>
    <li className={styleSidebar} id={section.id}>
      <h2 className={styles.sectionName}>{section.name}</h2>

      <ul className={styles.systemList}>
        {section.systems.map((system, index) => <System key={system.system_prefix} system={system} prefix={section.prefix} index={index}/>)}
        {section.prefix === 'PREFERS' && loading ? <SystemLoader/> : null}
      </ul>
    </li>
  )
}