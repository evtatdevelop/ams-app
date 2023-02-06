import React from "react";
import styles from './calendar.module.scss';

export const Calendar = props => {
  const monthDate = new Date(new Date()),
        year = monthDate.getFullYear(),
        month = monthDate.getMonth(),
        date = new Date(year, month, 1),
        from = date.getTime(),
        to = new Date(year, month + 1, 0, 23, 59, 59, 999 ).getTime(); 
  console.log(from);
  console.log(to);

  return (
    <div className={styles.calendar}>
      <input type="text"
        className={styles.date}
      />
      <div className={styles.picker}>
        <nav className={styles.navigation}>navigation</nav>
        <main className={styles.dates}>dates</main>
      </div>
    </div>
  )
}
