import React from "react";
import styles from './resources.module.scss';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { mainpage, dictionary, getMainpage } from "./mainpageSlice";
// import { user, setLang } from '../user/userSlice';
import { testMode } from "../../config";

export const Resources = () => {
  const _pathBase = testMode ? '' : '/ams';


  return (
    <section className={styles.tests}>
      <h1>Resources</h1>
      <Link to = {`${_pathBase}/`}>Mainpage</Link>
    </section>
  )
}
