import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import Input from "./input";
import SelectInput from "./selectInput";

export const Components = () => {

  return (
    <section className={styles.components}>
      <header className={styles.header}>
        <h1>Components</h1>
      </header>
      <Navigation/>

      <main className={styles.componentList}>
        <Input 
          inputHandler = { val => console.log(`Input: ${val}`) }
          placeholder = 'Test Input'
          val = ''
        />
        <SelectInput 
          inputHandler = { val => console.log(`SelectInput: ${val}`) }
          placeholder = 'Test SelectInput'
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, ]}
        />

      </main>

    </section>


  )
}
