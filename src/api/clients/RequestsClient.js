import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

/* SERVICIOS DE SOLICITUDES */
export const GetAllRequests = async () => await getData(Url.Solicitudes);
export const GetAllBySedeRequests = async (idSede) => await getData(Url.SolicitudesPorSede, { idSede });
export const GetByIdRequests = async (id) => await getData(Url.SolicitudesId, { id });
export const InsertRequests = async (solicitudes) => await postData(Url.Solicitudes, solicitudes);
export const UpdateRequestss = async (solicitudes) => await putData(Url.Solicitudes, solicitudes);
export const UpdateRequestsDataSend = async (solicitudes) => await putData(Url.SolicitudesDataSend, solicitudes);
export const DeleteRequests = async (idSolicitudes) => await deleteData(Url.Solicitudes, { idSolicitudes });
export const GetExcelRequests = async (parametroExcel) => await postData(Url.SolicitudesExcel, parametroExcel);


/* SERVICIOS DE DETALLES DE SOLICITUD */
export const GetAllRequestsDetaillsByIdSolicitud = async (idSolicitud) => await getData(Url.SolicitudDetalle, { idSolicitud });
export const GetByIdRequestsDetaills = async (id) => await getData(Url.SolicitudDetalleId, { id });
export const GetFileRequests = async (id) => await getData(Url.SolicitudDetalleFile, { id });
export const InsertRequestsDetaills = async (solicitudDetalle) => await postData(Url.SolicitudDetalle, solicitudDetalle);
export const UpdateRequestsDetaills = async (solicitudDetalle) => await putData(Url.SolicitudDetalle, solicitudDetalle);
export const DeleteRequestsDetaills = async (idSolicitudDetalle) => await deleteData(Url.SolicitudDetalle, { idSolicitudDetalle });
export const GetAllRequestsPendientes = async (idSede, estado) => await getData(Url.SolicitudDetallePendiente, { idSede, estado });