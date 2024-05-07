import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();
const currentUrl = window.location.href.split('/')[2];
const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
// : 'https://request.sibgenco.local/ams_api';
: `https://${currentUrl}/ams_api`;

export const getContractorsData = ( api_key ) => service.getResource(`${_apiBase}/?q=contractors`, api_key);