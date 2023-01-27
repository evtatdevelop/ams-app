import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import Input from "./input";

export const Components = () => {

  return (
    <section className={styles.components}>
      <header className={styles.header}>
        <h1>Components</h1>
      </header>
      <Navigation/>

      <main className={styles.componentList}>
        <Input 
          inputHandler = {(val)=>console.log(val)}
          placeholder = 'Test Input'
        />

      </main>

    </section>


  )
}
