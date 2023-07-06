import React from "react";
import styles from './sectionOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { filters, showOrderInfo } from "../../../../personalAreaSlice";
import { getFrontStatus } from "../../../../../../helpers";


export const SectionOrder = props => {
  const { order, hide } = props;
  const filtersData = useSelector(filters);
  const dispatch = useDispatch();

  const getIconStatus = () => {
    switch ( getFrontStatus(order.api_status) ) {
      case 'agreed': return <FontAwesomeIcon icon={ faCheck }/>
      case 'refused': return <FontAwesomeIcon icon={ faXmark }/>
      case 'inprogress': return <FontAwesomeIcon icon={ faArrowRight }/>
      default: return <FontAwesomeIcon icon={ faQuestion }/>  
    } 
  }
  const getStyleStatus = () => {
    switch ( getFrontStatus(order.api_status) ) {
      case 'agreed': return `${styles.agreed}`
      case 'refused': return `${styles.refused}`
      case 'inprogress': return `${styles.inprogress}`
      default: return `${styles.cuestion}`
    } 
  }

  const getShortName = longName => {
    const nameArr = longName.split(' ');
    return `${nameArr[0]} ${nameArr[1][0]}.${nameArr[2] ? `${nameArr[2][0]}.` : '' }`;
  }
  const onClic = () => window.open(`${order.urls.htm}${order.key}`, '_blank');
  const formatNum = order.request_number.split(filtersData.searchNum)

  
  const onMouseOver = ( e ) => {
    const { type, target } = e;
    if ( type === 'mouseover' ) {
      const { left, top, right, bottom } = target.closest('li').getBoundingClientRect()
      dispatch(showOrderInfo({
        showOI: true,
        leftOI: left,
        topOI: top,
        rigtOI: right,
        bottomOI: bottom,
        dataOI: order
      }))
    } else dispatch(showOrderInfo({}))
  }

  return (
    <> 
      { !hide
        ? <li className={styles.sectionOrder}>
            <button type="button"  className={styles.btnOpenOrder}
              onClick={() => onClic()}
              onMouseOver={ e => onMouseOver(e) }
              onMouseOut={ e =>onMouseOver(e) }
            >
              
              <p className={styles.orderName}>
                <span className={styles.requestNuber}>({`${formatNum[0]}`}<span className={styles.found}>{filtersData.searchNum}</span>{formatNum[1] ? `${formatNum[1]}`: ""}) </span>
                <span> {order.request_type}</span> 
                {order.order_type === 'WORKPLACE' || order.order_type === 'CORPSYSTEMS'
                  ? <span className={styles.oredrUser}> [ <span className={styles.italic}>{getShortName(order.api_order_user.name)}</span> ]</span>
                  : null
                }
              </p>
              
              <div className={`${styles.orderStatus} ${getStyleStatus()}`}>
                <p className={styles.statusSign}>{getIconStatus()}</p>
              </div> 

            </button>
          </li>
        : null
      }
    </>
  )
}
