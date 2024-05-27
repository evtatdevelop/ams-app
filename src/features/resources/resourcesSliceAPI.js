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

export const getServersData = ( api_key ) => service.getResource(`${_apiBase}/?q=servers`, api_key);