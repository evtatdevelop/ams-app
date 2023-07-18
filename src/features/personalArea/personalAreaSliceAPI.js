import Service from "../../services";
import { testMode, offline, offlinelang } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

// export const getMyordersData        = ( api_key ) => service.getResource(`${_apiBase}/?q=myorders`, api_key);
// export const getMyagreeData         = ( api_key ) => service.getResource(`${_apiBase}/?q=myagree`, api_key);
// export const getMysettingsData      = ( api_key ) => service.getResource(`${_apiBase}/?q=mysettings`, api_key);
// export const getMysubstitutionData  = ( api_key ) => service.getResource(`${_apiBase}/?q=mysubstitution`, api_key);
// export const getMyarchiveData       = ( api_key ) => service.getResource(`${_apiBase}/?q=myarchive`, api_key);
// export const getMyexecData          = ( api_key ) => service.getResource(`${_apiBase}/?q=myexec`, api_key);
// export const getMyexecarchData      = ( api_key ) => service.getResource(`${_apiBase}/?q=myexecarch`, api_key);

export const getMyordersData = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/myorders`, api_key) : service.getResource(`http://localhost:3000/myordersen`, api_key)
  : service.getResource(`${_apiBase}/?q=myorders`, api_key);
export const getMyagreeData         = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/myagree`, api_key) : service.getResource(`http://localhost:3000/myagreeen`, api_key)
  : service.getResource(`${_apiBase}/?q=myagree`, api_key);
export const getMysettingsData      = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mysettings`, api_key) : service.getResource(`http://localhost:3000/mysettingsen`, api_key)
  : service.getResource(`${_apiBase}/?q=mysettings`, api_key);
export const getMysubstitutionData  = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mysubstitution`, api_key) : service.getResource(`http://localhost:3000/mysubstitutionen`, api_key)
  : service.getResource(`${_apiBase}/?q=mysubstitution`, api_key);
export const getMyarchiveData       = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/myarchive`, api_key) : service.getResource(`http://localhost:3000/myarchiveen`, api_key)
  : service.getResource(`${_apiBase}/?q=myarchive`, api_key);
export const getMyexecData          = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/myexec`, api_key) : service.getResource(`http://localhost:3000/myexecen`, api_key)
  : service.getResource(`${_apiBase}/?q=myexec`, api_key);
export const getMyexecarchData      = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/myexecarch`, api_key) : service.getResource(`http://localhost:3000/myexecarchen`, api_key)
  : service.getResource(`${_apiBase}/?q=myexecarch`, api_key);

export const review = ( data ) => service.updateResource(`${_apiBase}/?q=review`, data);