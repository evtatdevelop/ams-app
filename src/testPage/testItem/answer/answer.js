import React from "react";
import styles from './answer.module.scss';

export const Answer = props => {
  const { data } = props;

  const objectShow = obj => Object.entries(obj).map((item, index) => {
      if ( item[1] && typeof(item[1]) === 'object' ) { 
        return <>
          <div className={styles.uperKey}>{`${item[0]} :`}</div>
          <div className={styles.subData}>{objectShow(item[1])}</div>
        </> 
         
      } else return <div key={index} className={styles.answerItem}>
        <div className={styles.ansKey}>{`${item[0]} :`}</div> 
          {`${item[1]}`}
        </div>
  }) 

  return (
    <div className={styles.answer}>
      { data 
        ? objectShow( data ) 
        : null
      }
    </div>
  )
}