import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const getContractorsData = ( api_key ) => service.getResource(`${_apiBase}/?q=contractors`, api_key);