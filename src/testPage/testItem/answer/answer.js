import React from "react";
import styles from './answer.module.scss';

export const Answer = props => {
  const { data } = props;

  const objectShow = obj => typeof(obj) === 'object'
    ? Object.entries(obj).map((item, index) => 
        item[1] && typeof(item[1]) === 'object'  
        ? <div  key={index}>
            <div className={styles.uperKey}>{`${item[0]} :`}</div>
            <div className={styles.subData}>{objectShow(item[1])}</div>
          </div>
        : <div key={index} className={styles.answerItem}>
            <div className={styles.ansKey}>{`${item[0]} :`}</div> 
            {`${item[1]}`}
          </div>
      )
    : <div className={styles.answerItem}>{obj}</div>

  return (
    <div className={styles.answer}>
      { data 
        ? objectShow( data ) 
        : null
      }
    </div>
  )
}