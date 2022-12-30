import React from "react";
import styles from './personalArea.module.scss';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { mainpage, dictionary, getMainpage } from "./mainpageSlice";
// import { user, setLang } from '../user/userSlice';
import { testMode } from "../../config";

export const PersonalArea = () => {
  const _pathBase = testMode ? '' : '/ams';

  return (
    <section className={styles.tests}>
      <h1>Personal Area</h1>
      <Link to = {`${_pathBase}/`}>Mainpage</Link>
    </section>
  )
}
