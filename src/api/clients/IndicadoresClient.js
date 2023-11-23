import { Url } from '../instances/AuthRoute';
import { getData } from '../UtilInstance';

export const GetByIdIndicadores = async (id) => await getData(Url.IndicadoresId, { id });
export const GetAllIndicadores = async () => await getData(Url.Indicadores);