import React from "react";
import styles from './searchList.module.scss';
import { useSelector } from "react-redux";
import { filtred } from "../mainpageSlice";
import { System } from "../section/system/system";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json'

export const SearchList = () => {

  const searchList = useSelector(filtred);
  const userData = useSelector(user);

  return (
    <>
      <h2 className={styles.name}>{dictionary.searching_results[userData['lang']]}</h2>
      <ul className={styles.searchList}>
        {searchList.map(system => {
          return <System key={system.system_prefix} system={system}/>
        })}
      </ul>
    </>

  )
}