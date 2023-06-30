import React from "react";
import styles from './filters.module.scss';
import { useSelector } from "react-redux";
import { user } from '../../user/userSlice';
// import { sorted } from "../lkSlice";
import dictionary from '../../../dictionary.json';
import Input from "./input";
import Select from "./select";
import InputDate from ".//inputDate";

export const Filters = () => {
  const userData = useSelector(user);
 

  return (
    <div className={styles.filters}>
      <div>
        <Input 
          inputHandler = { val => console.log(val) }
          placeholder = {dictionary['searchAppNum'][userData['lang']]}
          val = ''
        />
      </div>
      
      <div>
        <p>{dictionary['searchAppFrom'][userData['lang']]}:</p>
        <InputDate
          dateHandler = { val =>console.log(val) }
          lang = {userData['lang']}
        />
      </div>
      
      <div>
        <p>{dictionary['searchAppTo'][userData['lang']]}:</p>
        <InputDate
          dateHandler = { val =>console.log(val) }
          lang = {userData['lang']}
        />
      </div>
      
      <div>
        <Select
          selectHandler = { val => console.log(val) }
          placeholder = {dictionary['searchType'][userData['lang']]}
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
          val = ''
          name='orderType'
        />
      </div>
    </div>       
  )
}
