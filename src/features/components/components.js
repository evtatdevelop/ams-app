import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import Input from "./input";
import Select from "./select";
import SelectInput from "./selectInput";
import Calendar from "./calendar";

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
          placeholder = 'Input'
          val = ''
        />

        <Select
          selectHandler = { val => onWork(val) }
          placeholder = 'Select'
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
          val = ''
          name='TestSelect'
        />

        <SelectInput
          selectHandler = { val => onWork(val) }
          placeholder = 'SelectInput'
          val = ''
          name='TestSelectInput'
        />

        <Calendar
          dateHandler = { val => onWork(val) }
          val = ''
          name='TestDateInput'
          lang='en'
        />

      </main>

    </section>


  )
}
