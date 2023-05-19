import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRefund = async () => await getData(Url.Reintegro);
export const GetByIdRefund = async (id) => await getData(Url.ReintegroId, { id });
export const InsertRefund = async (reintegro) => await postData(Url.Reintegro, reintegro);
export const GetExcelRefund = async (parametroExcel) => await postData(Url.ReintegroExcel, parametroExcel);
export const UpdateRefunds = async (reintegro) => await putData(Url.Reintegro, reintegro);
export const DeleteRefund = async (idReintegro) => await deleteData(Url.Reintegro, { idReintegro });

export const InsertListaChekeo = async (id) => await getData(Url.ReintegroGenerarList, { id });