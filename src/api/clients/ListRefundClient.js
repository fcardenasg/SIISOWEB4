import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllReintegro = async (page, pageSize, idReintegro) => await getData(Url.ListaReintegro_GetAllReintegro, { page, pageSize, idReintegro });
export const GetAllListRefund = async (page, pageSize) => await getData(Url.ListaReintegro, { page, pageSize });
export const GetByIdListRefund = async (id) => await getData(Url.ListaReintegroId, { id });
export const InsertListRefund = async (listaReintegro) => await postData(Url.ListaReintegro, listaReintegro);
export const UpdateListRefunds = async (listaReintegro) => await putData(Url.ListaReintegro, listaReintegro);
export const DeleteListRefund = async (idListaReintegro) => await deleteData(Url.ListaReintegro, { idListaReintegro });