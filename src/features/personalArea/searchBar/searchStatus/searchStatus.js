import React from "react";
import styles from './searchStatus.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../../../user/userSlice';
import dictionary from '../../../../dictionary.json';
import { setSearchStat, filters } from "../../personalAreaSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'

export const SearchStatus = () => {
  const userData = useSelector(user);
  const filtersData = useSelector(filters);
  const dispatch = useDispatch();

  let styleOnOffAgreed, styleOnOffRefused, styleOnOffInProgress = ''
  if ( filtersData.searchNoStatus && filtersData.searchNoStatus.length > 0 ) {
    styleOnOffAgreed = filtersData.searchNoStatus.includes('agreed') ? `${styles.off}` : ''
    styleOnOffRefused = filtersData.searchNoStatus.includes('refused') ? `${styles.off}`: ''
    styleOnOffInProgress = filtersData.searchNoStatus.includes('inprogress') ? `${styles.off}` : ''
  }

  return (
    <nav className={styles.searchStatus}>
      
      <button type="bytton" className={`${styles.serchStatBtn} ${styles.agreed} ${styleOnOffAgreed}`} 
        title={dictionary['agreed'][userData['lang']]}
        onClick={() => dispatch(setSearchStat('agreed'))}
      ><FontAwesomeIcon icon={ faCheck }/></button>
      
      <button type="bytton" className={`${styles.serchStatBtn} ${styles.refused} ${styleOnOffRefused}`} 
        title={dictionary['refused'][userData['lang']]}
        onClick={() => dispatch(setSearchStat('refused'))}
      ><FontAwesomeIcon icon={ faXmark }/></button>
      
      <button type="bytton" className={`${styles.serchStatBtn} ${styles.inprogress} ${styleOnOffInProgress}`} 
        title={dictionary['inprogress'][userData['lang']]}
        onClick={() => dispatch(setSearchStat('inprogress'))}
      ><FontAwesomeIcon icon={ faArrowRight }/></button>
    
    </nav>
  )
}
