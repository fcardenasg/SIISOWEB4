import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOrders = async (page, pageSize) => await getData(Url.Ordenes, { page, pageSize });
export const GetByIdOrders = async (id) => await getData(Url.OrdenesId, { id });
export const InsertOrders = async (ordenes) => await postData(Url.Ordenes, ordenes);
export const UpdateOrders = async (ordenes) => await putData(Url.Ordenes, ordenes);
export const DeleteOrders = async (idOrdenes) => await deleteData(Url.Ordenes, { idOrdenes });