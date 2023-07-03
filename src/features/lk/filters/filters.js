import React from "react";
import styles from './filters.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../user/userSlice';
// import { sorted } from "../lkSlice";
import dictionary from '../../../dictionary.json';
import Input from "./input";
import Select from "./select";
import InputDate from "./inputDate";
import { clearSearch, setSearchNum } from "../lkSlice";

export const Filters = () => {
  const userData = useSelector(user);
  const dispatch = useDispatch();

  return (
    <div className={styles.filters}>
      <div>
        <Input 
          inputHandler = { val => dispatch(setSearchNum(val)) }
          inputClear = { val => dispatch(setSearchNum(null)) }
          placeholder = {dictionary['searchAppNum'][userData['lang']]}
          val = ''
        />
      </div>
      
      <div>
        <InputDate
          dateHandler = { val =>console.log(val) }
          dateClear = { () =>console.log('dateClearFrom') }
          lang = {userData['lang']}
          placeholder = {dictionary['searchAppFrom'][userData['lang']]}
        />
      </div>
      
      <div>
        <InputDate
          dateHandler = { val =>console.log(val) }
          dateClear = { () =>console.log('dateClearTo') }
          lang = {userData['lang']}
          placeholder = {dictionary['searchAppTo'][userData['lang']]}
        />
      </div>
      
      <div>
        <Select
          selectHandler = { val => console.log(val) }
          selectClear = { val => console.log('selectClear') }
          placeholder = {dictionary['searchType'][userData['lang']]}
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
          val = ''
          name='orderType'
        />
      </div>

      <button type="button" className={styles.clearSearchBtn}
        onClick={ () => dispatch(clearSearch()) }
      >{dictionary['clearSearchBtn'][userData['lang']]}</button>
    </div>       
  )
}
