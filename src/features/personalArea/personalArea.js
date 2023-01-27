import React from "react";
import styles from './personalArea.module.scss';
// import { useSelector, useDispatch } from "react-redux";
import Navigation from "../navigation";

export const PersonalArea = () => {

  return (
    <section className={styles.personalArea}>
      <header className={styles.header}>
        <h1>Personal Area</h1>
      </header>
      <Navigation/>
    </section>
  )
}
