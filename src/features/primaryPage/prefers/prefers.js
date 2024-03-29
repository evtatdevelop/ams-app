import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mainpage, setOrderPrefers, orderPrefers } from "../mainpageSlice";
import { user } from '../../user/userSlice';
import Section from "../section";
import dictionary from '../../../dictionary.json';
import { lsGet } from "../../../helpers";

export const Prefers = () => {
  const userData = useSelector(user);
  const pageData = useSelector(mainpage);
  const orderPrefersData = useSelector(orderPrefers);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( userData['id'] ) dispatch(setOrderPrefers(lsGet(`orderPrefers${userData['id']}`, [])))
  }, [dispatch, userData]);

  const mkPrefersData = (pageData, userData) => {
    const prefers = {id: 'prefers', prefix: 'PREFERS', name: dictionary['FAVORITES'][userData['lang']], systems: []};
    const setPrefers = new Set();
    const removerTop = userData['id'] ? lsGet(`remobedTops${userData['id']}`, []) : []
    pageData.map(section => 
      section.prefix === 'TOP_ORDERS' || section.prefix === 'FAVORITES' 
      ?  section.systems.map(sytem => {
          if ( !setPrefers.has(sytem.system_prefix) && !removerTop.includes(sytem.system_prefix) ) {
            prefers.systems.push({...sytem, section_prefix: section.prefix})
          }
          setPrefers.add(sytem.system_prefix)
          return null
        })
      : null
    )
    return orderPrefersData.length === 0 ? prefers : orderedPrefers(orderPrefersData, prefers);
  }

  const orderedPrefers = ( order, prefers ) => {
    const newOredr = []
    order.map(item => prefers.systems.map(system => {
      if (system.system_prefix === item) newOredr.push(system)
      return true;
    }))
    prefers.systems.map(system => {
      if (!order.includes(system.system_prefix) ) newOredr.push(system)
      return true;
    })
    return {...prefers, systems: newOredr}
  }

  return (
    mkPrefersData(pageData, userData)['systems'].length !== 0 ? <Section key="prefers" section={mkPrefersData(pageData, userData)}/> : null
  )
}

