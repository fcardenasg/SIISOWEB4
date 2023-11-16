import { Url } from '../instances/AuthRoute';
import { getData } from '../UtilInstance';

export const GetIndicadorMain = async () => await getData(Url.Indicador);