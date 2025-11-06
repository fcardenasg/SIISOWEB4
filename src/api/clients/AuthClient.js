import { Url } from "api/instances/AuthRoute";
import { getData } from "api/UtilInstance";

const tokenKey = 'token';
export const getToken = () => localStorage.getItem(tokenKey);

export const QueryAllDataEmployeeSIISO = async (documento) => await getData(`${Url.Login}/general-employee-inquiry`, { documento });