import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllRequests = async (page, pageSize) => await getData(Url.Solicitudes, { page, pageSize });
export const GetByIdRequests = async (id) => await getData(Url.SolicitudesId, { id });
export const InsertRequests = async (requests) => await postData(Url.Solicitudes, requests);
export const UpdateRequestss = async (requests) => await putData(Url.Solicitudes, requests);
export const DeleteRequests = async (idSolicitudes) => await deleteData(Url.Solicitudes, { idSolicitudes });


export const GetAllRequestsDetaillsByIdSolicitud = async (idSolicitud) => await getData(Url.SolicitudDetalle, { idSolicitud });
export const InsertRequestsDetaills = async (solicitudDetalle) => await postData(Url.SolicitudDetalle, solicitudDetalle);
export const UpdateRequestsDetaills = async (solicitudDetalle) => await putData(Url.SolicitudDetalle, solicitudDetalle);
export const DeleteRequestsDetaills = async (idSolicitudDetalle) => await deleteData(Url.SolicitudDetalle, { idSolicitudDetalle });
export const GetAllRequestsPendientes = async () => await getData(Url.SolicitudDetallePendiente);