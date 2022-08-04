import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllSGSST = async (page, pageSize) => await getData(Url.SGSST, { page, pageSize });
export const GetByIdSGSST = async (id) => await getData(Url.SGSSTId, { id });
export const InsertSGSST = async (sistemaGestion) => await postData(Url.SGSST, sistemaGestion);
export const UpdateSGSSTS = async (sistemaGestion) => await putData(Url.SGSST, sistemaGestion);
export const DeleteSGSST = async (idSistemaGestion) => await deleteData(Url.SGSST, { idSistemaGestion });