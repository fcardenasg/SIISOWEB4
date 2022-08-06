import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRefund = async (page, pageSize) => await getData(Url.Reintegro, { page, pageSize });
export const GetByIdRefund = async (id) => await getData(Url.ReintegroId, { id });
export const InsertRefund = async (reintegro) => await postData(Url.Reintegro, reintegro);
export const UpdateRefunds = async (reintegro) => await putData(Url.Reintegro, reintegro);
export const DeleteRefund = async (idReintegro) => await deleteData(Url.Reintegro, { idReintegro });