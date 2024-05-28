import Service from "../../services";
import { offlinelang, apiBase } from "../../config";

const service = new Service();

export const getMainpageData = ( api_key ) => !offlinelang 
  ? service.getResource(`${apiBase}/?q=mainpage`, api_key)
  : offlinelang === 'ru' ? service.getResource(`${apiBase}/mainpage`, api_key) : service.getResource(`${apiBase}/mainpageen`, api_key);

export const addPrefers = ( data ) => service.updateResource(`${apiBase}/?q=addprefers`, data);
export const delPrefers = ( data ) => service.updateResource(`${apiBase}/?q=delprefers`, data);

export const getTestData = ( api_key ) => service.getResource(`${apiBase}/?q=testEmail`, api_key);