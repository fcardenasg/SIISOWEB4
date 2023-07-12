import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOrders = async (page, pageSize) => await getData(Url.Ordenes, { page, pageSize });
export const GetByIdOrders = async (id) => await getData(Url.OrdenesId, { id });
export const GetByOrders = async (id) => await getData(Url.LsOrdenes, { id });
export const InsertOrders = async (ordenes) => await postData(Url.Ordenes, ordenes);
export const UpdateOrders = async (ordenes) => await putData(Url.Ordenes, ordenes);
export const DeleteOrders = async (idOrdenes) => await deleteData(Url.Ordenes, { idOrdenes });

export const GetAllOrdersParaclinicos = async (idOrdenes) => await getData(Url.OrdenesParaclinicos, { idOrdenes });
export const GetByIdOrdersParaclinicos = async (id) => await getData(Url.OrdenesParaclinicosId, { id });
export const InsertOrdersParaclinicos = async (ordenesParaclinicos) => await postData(Url.OrdenesParaclinicos, ordenesParaclinicos);
export const InsertOrdersParaclinicosMasiva = async (insertMasivoDTO) => await postData(Url.OrdenesParaclinicosMasiva, insertMasivoDTO);
export const DeleteOrdersParaclinicos = async (idOrdenesParaclinicos) => await deleteData(Url.OrdenesParaclinicos, { idOrdenesParaclinicos });

export const GetExcelOrdersParaclinicos = async (parametroExcel) => await postData(Url.OrdenesParaclinicosExcel, parametroExcel);