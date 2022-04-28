import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllItems = async (page, pageSize) => await getData(Url.Items, { page, pageSize });
export const GetByIdItems = async (id) => await getData(Url.ItemsId, { id });
export const GetAllByAtencion = async (page, pageSize, idAtencion) => await getData(Url.ItemsGetAllByAtencion, { page, pageSize, idAtencion });
export const InsertItems = async (items) => await postData(Url.Items, items);
export const UpdateItem = async (items) => await putData(Url.Items, items);
export const DeleteItems = async (idItems) => await deleteData(Url.Items, { idItems });