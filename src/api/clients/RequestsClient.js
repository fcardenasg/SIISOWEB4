import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRequests = async (page, pageSize) => await getData(Url.Solicitudes, { page, pageSize });
export const GetByIdRequests = async (id) => await getData(Url.SolicitudesId, { id });
export const InsertRequests = async (requests) => await postData(Url.Solicitudes, requests);
export const UpdateRequestss = async (requests) => await putData(Url.Solicitudes, requests);
export const DeleteRequests = async (idrequests) => await deleteData(Url.Solicitudes, { idrequests });