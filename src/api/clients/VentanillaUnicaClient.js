import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdVentanillaUnica = async (id) => await getData(Url.VentanillaUnicaId, { id });
export const GetAllVentanillaUnica = async () => await getData(Url.VentanillaUnica);
export const GetAllVentanillaUnicaMonitoreo = async (options) => await getData(Url.VentanillaUnicaMonitoreo, { options });
export const GetAllDocumentoVentanilla = async (documento) => await getData(Url.VentanillaUnicaDocumento, { documento });
export const InsertVentanillaUnica = async (ventanillaUnica) => await postData(Url.VentanillaUnica, ventanillaUnica);
export const UpdateVentanillaUnicas = async (ventanillaUnica) => await putData(Url.VentanillaUnica, ventanillaUnica);
export const UpdateVentanillaUnicaEnvio = async (ventanillaUnica) => await putData(Url.UpdateVentanillaUnicaEnvio, ventanillaUnica);
export const DeleteVentanillaUnica = async (idVentanillaUnica) => await deleteData(Url.VentanillaUnica, { idVentanillaUnica });

export const GetAllVentanillaUnicaDetalleArea = async (idUsuario, options) => await getData(Url.VentanillaUnicaDetalleArea, { idUsuario, options });
export const GetVentanillaUnicaDetalleArchivo = async (id) => await getData(Url.VentanillaUnicaDetalleArchivo, { id });
export const GetByIdVentanillaUnicaDetalle = async (id) => await getData(Url.VentanillaUnicaDetalleId, { id });
export const GetAllVentanillaUnicaDetalle = async (idVentanilla, idArea, options) => await getData(Url.VentanillaUnicaDetalleList, { idVentanilla, idArea, options });
export const InsertVentanillaUnicaDetalle = async (ventanillaUnicaDetalle) => await postData(Url.VentanillaUnicaDetalle, ventanillaUnicaDetalle);
export const UpdateVentanillaUnicaDetalle = async (ventanillaUnicaDetalle) => await putData(Url.VentanillaUnicaDetalle, ventanillaUnicaDetalle);
export const DeleteVentanillaUnicaDetalle = async (idVentanillaUnicaDetalle) => await deleteData(Url.VentanillaUnicaDetalle, { idVentanillaUnicaDetalle });