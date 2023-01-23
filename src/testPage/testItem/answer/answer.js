import React from "react";
import styles from './answer.module.scss';

export const Answer = props => {
  const { data } = props;

  return (
    <div className={styles.answer}>
      { data 
        ? Object.entries(data).map((item, index) => {
            return <div key={index} className={styles.answerItem}>
                    <div className={styles.ansKey}>{`${item[0]} :`}</div> 
                    {`${item[1]}`}
              </div>
          }) 
        : null
      }
    </div>
  )
}