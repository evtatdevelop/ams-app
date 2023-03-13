import React from "react";
import styles from './components.module.scss';
import Navigation from "../navigation";

import Input from "./input";
import Select from "./select";
import SelectInput from "./selectInput";
import InputDate from "./inputDate";
import DateInterval from "./dateInterval";

export const Components = () => {

  const onWork = val => {
    // if ( typeof(val) === 'object') 

    console.log(`${val}`)
  }

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

        <div className={styles.calendarsBox}>
           <InputDate
              dateHandler = { val => onWork(val) }
              lang='ru'
            />
           <InputDate
              dateHandler = { val => onWork(val) }
              lang='en'
            />
        </div>

        <DateInterval 
          dateHandler = { val => onWork(val) }
          lang='ru'
        />
        
      </main>

    </section>


  )
}
