import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdHeadcount = async (id) => await getData(Url.HeadcountId, { id });
export const GetAllHeadcount = async () => await getData(Url.Headcount);
export const GetAllHeadcountByAnio = async (anio) => await getData(Url.HeadcountAnio, { anio });
export const InsertHeadcount = async (headcount) => await postData(Url.Headcount, headcount);
export const UpdateHeadcounts = async (headcount) => await putData(Url.Headcount, headcount);
export const DeleteHeadcount = async (idHeadcount) => await deleteData(Url.Headcount, { idHeadcount });