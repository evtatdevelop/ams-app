import React from "react";
import styles from './searchBar.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { clearSearch, page } from "../personalAreaSlice";
import Input from "../input";
import DateInterval from "../dateInterval";
import { SearchStatus } from "./searchStatus/searchStatus";
import Select from "../select";

export const SearchBar = () => {
  const userData = useSelector(user);
  const pageData = useSelector(page);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchBar}>
              
      <Input placeholder = {dictionary['searchAppNum'][userData['lang']]}/>

      <Select
          placeholder = {dictionary['searchType'][userData['lang']]}
          name='orderType'
          lang = {userData['lang']}
        />  
      
      {/* <p className={styles.saerchCaption}>{dictionary['timePeriod'][userData['lang']]}</p> */}
      <DateInterval lang={userData['lang']}/>

      { pageData !== 'myagree'
        ? <>
            <p className={styles.saerchCaption}>{dictionary['searchStatus'][userData['lang']]}</p>
            <SearchStatus/>         
          </>
        : null  
      }
 
      
      <button type="button" className={styles.clearSearchBtn}
        onClick={ () => dispatch(clearSearch()) }
      >{dictionary['clearSearchBtn'][userData['lang']]}</button>

    </div>
  )
}
