import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllWorkAbsenteeism = async () => await getData(Url.AusentismoLaboral);
export const GetByIdWorkAbsenteeism = async (id) => await getData(Url.AusentismoLaboralId, { id });
export const InsertWorkAbsenteeism = async (ausentismoLaboral) => await postData(Url.AusentismoLaboral, ausentismoLaboral);
export const GetExcelWorkAbsenteeism = async (parametroExcel) => await postData(Url.AusentismoLaboralExcel, parametroExcel);
export const UpdateWorkAbsenteeisms = async (ausentismoLaboral) => await putData(Url.AusentismoLaboral, ausentismoLaboral);
export const DeleteWorkAbsenteeism = async (idAusentismoLaboral) => await deleteData(Url.AusentismoLaboral, { idAusentismoLaboral });

export const GetAllWorkAbsenteeismDocumento = async (documento) => await getData(Url.AusentismoLaboral_Documento, { documento });
export const GetAllWorkAbsenteeismNumeroDia = async (documento) => await getData(Url.AusentismoLaboral_NumDia, { documento });

/* SERVICIOS DE AUSENTISMO LABORAL HISTORICO */
export const GetAllWorkAbsenteeismHistory = async () => await getData(Url.AusentismoLaboralHistorico);
export const GetByIdWorkAbsenteeismHistory = async (id) => await getData(Url.AusentismoLaboralHistoricoId, { id });
export const GetExcelWorkAbsenteeismHistory = async (parametroExcel) => await postData(Url.AusentismoLaboralHistoricoExcel, parametroExcel);