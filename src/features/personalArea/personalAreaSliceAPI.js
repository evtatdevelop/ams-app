import Service from "../../services";
import { offlinelang, apiBase } from "../../config";

const service = new Service();

export const getMyordersData = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=myorders`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/myorders`, api_key) : service.getResource(`${apiBase}/myordersen`, api_key);
  
export const getMyagreeData         = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=myagree`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/myagree`, api_key) : service.getResource(`${apiBase}/myagreeen`, api_key);

export const getMysettingsData      = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=mysettings`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/mysettings`, api_key) : service.getResource(`${apiBase}/mysettingsen`, api_key);

export const getMysubstitutionData  = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=mysubstitution`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/mysubstitution`, api_key) : service.getResource(`${apiBase}/mysubstitutionen`, api_key);

export const getMyarchiveData       = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=myarchive`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/myarchive`, api_key) : service.getResource(`${apiBase}/myarchiveen`, api_key);

export const getMyexecData          = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=myexec`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/myexec`, api_key) : service.getResource(`${apiBase}/myexecen`, api_key);

export const getMyexecarchData      = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=myexecarch`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/myexecarch`, api_key) : service.getResource(`${apiBase}/myexecarchen`, api_key);

export const review = ( data ) => service.updateResource(`${apiBase}/?q=review`, data);