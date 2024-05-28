import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getMainpageData = ( api_key ) => service.getResource(`${apiBase}/?q=mainpage`, api_key);
export const addPrefers = ( data ) => service.updateResource(`${apiBase}/?q=addprefers`, data);
export const delPrefers = ( data ) => service.updateResource(`${apiBase}/?q=delprefers`, data);