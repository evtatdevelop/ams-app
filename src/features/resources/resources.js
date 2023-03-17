import React from "react";
import styles from './resources.module.scss';
import Navigation from "../navigation";

export const Resources = () => {

  return (
    <section className={styles.resources}>
      <header className={styles.header}>
        <h1>Resources</h1>
      </header>
      <Navigation/>
    </section>
  )
}
