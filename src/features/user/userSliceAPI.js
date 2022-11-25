import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const getUserData = () => service.getResource(`${_apiBase}/?q=user`);
export const setUserLang = ( data ) => service.updateResource(`${_apiBase}/?q=user`, data);
