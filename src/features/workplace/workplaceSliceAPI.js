import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getContractorsData = ( api_key ) => service.getResource(`${apiBase}/?q=contractors`, api_key);