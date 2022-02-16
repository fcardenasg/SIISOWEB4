import { getData } from '../UtilInstance';

export const GetById = async (url, id) => await getData(url, { id });