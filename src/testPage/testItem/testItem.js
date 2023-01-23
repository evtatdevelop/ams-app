import React, { useState } from "react";
import styles from './testItem.module.scss';
import { TestLoader } from "../testLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Answer from "./answer";

export const TestItem = props => {
  const {name, request, data} = props;
  const [result, onResult] = useState(false)
  const [answer, getAnswer] = useState(null)
  
  if ( !answer ) {
    request(data).then(value => {
      getAnswer(value);
      return onResult(true)
    })    
  }

  return (
    <div className={styles.testItem}>
      <div className={styles.testName}>{name}</div>
      <div className={styles.testRes}>{ result 
        ? <FontAwesomeIcon icon={faCheck} className={styles.successIcon}/> 
        : <TestLoader/> }
      </div>
      <Answer data={answer}/>
    </div>
  )
}
