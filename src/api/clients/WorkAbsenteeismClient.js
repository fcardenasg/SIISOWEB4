import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkAbsenteeism = async (page, pageSize) => await getData(Url.AusentismoLaboral, { page, pageSize });
export const GetByIdWorkAbsenteeism = async (id) => await getData(Url.AusentismoLaboralId, { id });
export const InsertWorkAbsenteeism = async (ausentismoLaboral) => await postData(Url.AusentismoLaboral, ausentismoLaboral);
export const UpdateWorkAbsenteeisms = async (ausentismoLaboral) => await putData(Url.AusentismoLaboral, ausentismoLaboral);
export const DeleteWorkAbsenteeism = async (idAusentismoLaboral) => await deleteData(Url.AusentismoLaboral, { idAusentismoLaboral });