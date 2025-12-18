import { Url } from '../instances/AuthRoute';
import { getData, postData } from '../UtilInstance';

export const GetAllInvestigation = async () => await getData(Url.Investigacion);
export const GetByIdInvestigation = async (id) => await getData(Url.InvestigacionId, { id });
export const GetDxMLInvestigation = async (documento) => await getData(`${Url.Investigacion}/dxml`, { documento });
export const InsertInvestigation = async (investigation) => await postData(Url.Investigacion, investigation);
export const GetExcelInvestigation = async (parametro) => await postData(`${Url.Investigacion}/excel`, parametro);

/* Comentario */
export const GetByIdIELComentario = async (idInvestigacion) => await getData(`${Url.Investigacion}/comentario`, { idInvestigacion });
export const InsertIELComentario = async (comentario) => await postData(`${Url.Investigacion}/comentario`, comentario);