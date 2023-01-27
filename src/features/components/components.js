import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import SerachPerson from "./serachPerson";

export const Components = () => {

  return (
    <section className={styles.components}>
      <header className={styles.header}>
        <h1>Components</h1>
      </header>
      <Navigation/>

      <main>
        <SerachPerson/>
        
      </main>

    </section>


  )
}
