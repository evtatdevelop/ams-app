import Service from "../../services";
import { mode, offline, offlinelang } from "../../config";

const service = new Service();
// const currentUrl = window.location.href.split('/')[2];
// const _apiBase = testMode 
// ? 'https://request.sibgenco.local/ams_api_tst'
// // : 'https://request.sibgenco.local/ams_api';
// // : 'https://asuz.digtp.com/ams_api';
// // : `https://${currentUrl}/ams_api`;
// : `https://${window.location.hostname}/ams_api`;

let _apiBase;
switch ( mode ) {
  case 'test': _apiBase ='https://request.sibgenco.local/ams_api_tst'; break;
  case 'prod': _apiBase = `https://${window.location.hostname}/ams_api`; break;
  default: _apiBase ='https://request.sibgenco.local/ams_api_tst'
}

// export const getMainpageData = ( api_key ) => service.getResource(`${_apiBase}/?q=mainpage`, api_key);
export const getMainpageData = ( api_key ) => offline 
  ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mainpage`, api_key) : service.getResource(`http://localhost:3000/mainpageen`, api_key)
  : service.getResource(`${_apiBase}/?q=mainpage`, api_key);

export const addPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=addprefers`, data);
export const delPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=delprefers`, data);

export const getTestData = ( api_key ) => service.getResource(`${_apiBase}/?q=testEmail`, api_key);