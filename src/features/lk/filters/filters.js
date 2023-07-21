import React from "react";
import styles from './filters.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../user/userSlice';
// import { sorted } from "../lkSlice";
import dictionary from '../../../dictionary.json';
import Input from "./input";
import Select from "./select";
import InputDate from "./inputDate";
import { clearSearch, setSearchNum, setSearchDateFrom, setSearchDateTo, orderTypes, setSearchType } from "../lkSlice";
import SelectInput from "./selectInput";

export const Filters = () => {
  const userData = useSelector(user);
  const orderTypesData = useSelector(orderTypes);
  const dispatch = useDispatch();

  return (
    <div className={styles.filters}>
      <div style={{width: '165px'}}>
        <Input 
          inputHandler = { val => dispatch(setSearchNum(val)) }
          inputClear = { val => dispatch(setSearchNum(null)) }
          placeholder = {dictionary['searchAppNum'][userData['lang']]}
          val = ''
        />
      </div>
      
      <div style={{width: '165px'}}>
        <InputDate
          dateHandler = { val => dispatch(setSearchDateFrom(val)) }
          dateClear = { () => dispatch(setSearchDateFrom(null)) }
          lang = {userData['lang']}
          placeholder = {dictionary['searchAppFrom'][userData['lang']]}
          mode = 'from'
        />
      </div>
      
      <div style={{width: '165px'}}>
        <InputDate
          dateHandler = { val => dispatch(setSearchDateTo(val)) }
          dateClear = { () => dispatch(setSearchDateTo(null)) }
          lang = {userData['lang']}
          placeholder = {dictionary['searchAppTo'][userData['lang']]}
          mode = 'to'
        />
      </div>
      
      <div style={{width: '275px'}}>
        <Select
          selectHandler = { val => dispatch(setSearchType(val)) }
          selectClear = { () => dispatch(setSearchType(null)) }
          placeholder = {dictionary['searchType'][userData['lang']]}
          selectList = {orderTypesData}
          val = ''
          name='orderType'
          lang = {userData['lang']}
        />
      </div>

      <div style={{width: '375px'}}>
      <SelectInput
          // selectHandler = { val => console.log(val) }
          placeholder = {dictionary['searchFullname'][userData['lang']]}
          val = ''
          name='TestSelectInputLk'
        />
      </div>

      <button type="button" className={styles.clearSearchBtn}
        onClick={ () => dispatch(clearSearch()) }
      >{dictionary['clearSearchBtn'][userData['lang']]}</button>
    </div>       
  )
}
