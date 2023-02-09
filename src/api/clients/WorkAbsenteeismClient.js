import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkAbsenteeism = async (page, pageSize) => await getData(Url.AusentismoLaboral, { page, pageSize });
export const GetByIdWorkAbsenteeism = async (id) => await getData(Url.AusentismoLaboralId, { id });
export const InsertWorkAbsenteeism = async (ausentismoLaboral) => await postData(Url.AusentismoLaboral, ausentismoLaboral);
export const GetExcelWorkAbsenteeism = async (parametroExcel) => await postData(Url.AusentismoLaboralExcel, parametroExcel);
export const UpdateWorkAbsenteeisms = async (ausentismoLaboral) => await putData(Url.AusentismoLaboral, ausentismoLaboral);
export const DeleteWorkAbsenteeism = async (idAusentismoLaboral) => await deleteData(Url.AusentismoLaboral, { idAusentismoLaboral });

export const GetAllWorkAbsenteeismDocumento = async (page, pageSize, documento) => await getData(Url.AusentismoLaboral_Documento, { page, pageSize, documento });
export const GetAllWorkAbsenteeismNumeroDia = async (documento) => await getData(Url.AusentismoLaboral_NumDia, { documento });