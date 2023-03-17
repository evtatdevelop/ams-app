import React from "react";
import styles from './workplace.module.scss';
import Navigation from "../navigation";

export const Workplace = () => {

  return (
    <section className={styles.workplace}>
      <header className={styles.header}>
        <h1>Workplace</h1>
      </header>
      <Navigation/>
    </section>
  )
}
