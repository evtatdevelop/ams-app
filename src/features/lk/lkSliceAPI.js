import Service from "../../services";
import { mode } from "../../config";

const service = new Service();
// const currentUrl = window.location.href.split('/')[2];
// const _apiBase = testMode 
// ? 'https://request.sibgenco.local/ams_api_tst'
// // : 'https://request.sibgenco.local/ams_api';
// // : `https://${currentUrl}/ams_api`;
// : `https://${window.location.hostname}/ams_api`;

let _apiBase;
switch ( mode ) {
  case 'test': _apiBase ='https://request.sibgenco.local/ams_api_tst'; break;
  case 'prod': _apiBase = `https://${window.location.hostname}/ams_api`; break;
  default: _apiBase ='https://request.sibgenco.local/ams_api_tst'
}

export const getMyordersData        = ( api_key ) => service.getResource(`${_apiBase}/?q=myorders`, api_key);
export const getMyagreeData         = ( api_key ) => service.getResource(`${_apiBase}/?q=myagree`, api_key);
export const getMysettingsData      = ( api_key ) => service.getResource(`${_apiBase}/?q=mysettings`, api_key);
export const getMysubstitutionData  = ( api_key ) => service.getResource(`${_apiBase}/?q=mysubstitution`, api_key);
export const getMyarchiveData       = ( api_key ) => service.getResource(`${_apiBase}/?q=myarchive`, api_key);
export const getMyexecData          = ( api_key ) => service.getResource(`${_apiBase}/?q=myexec`, api_key);
export const getMyexecarchData      = ( api_key ) => service.getResource(`${_apiBase}/?q=myexecarch`, api_key);