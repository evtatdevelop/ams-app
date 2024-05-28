import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getServersData = ( api_key ) => service.getResource(`${apiBase}/?q=servers`, api_key);