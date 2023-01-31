import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import Input from "./input";
import SelectInput from "./selectInput";

export const Components = () => {

  const onWork = val => console.log(`${val}`)

  return (
    <section className={styles.components}>
      <header className={styles.header}>
        <h1>Components</h1>
      </header>
      <Navigation/>

      <main className={styles.componentList}>
        <Input 
          inputHandler = { val => onWork(val) }
          placeholder = 'Test Input'
          val = ''
        />
        <SelectInput 
          selectHandler = { val => onWork(val) }
          placeholder = 'Test SelectInput'
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
          val = ''
        />

      </main>

    </section>


  )
}
