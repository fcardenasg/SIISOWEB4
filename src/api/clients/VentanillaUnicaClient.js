import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdVentanillaUnica = async (id) => await getData(Url.VentanillaUnicaId, { id });
export const NotificarUsuarios = async (id) => await getData(Url.VentaUnicaNotiUsuarios, { id });
export const NotificarSolicitante = async (correo) => await postData(Url.VentaUnicaNotiSolicitante, correo);
export const DescargarDocumentoVentanillaUnica = async (id) => await getData(Url.VentanillaUnicaDescargarDocumento, { id });
export const GetFileVentanillaUnica = async (id) => await getData(Url.VentanillaUnicaFile, { id });
export const GenerateExcelVentanillaUnica = async () => await postData(Url.VentanillaUnicaExcel);

export const GetAllVentanillaUnica = async () => await getData(Url.VentanillaUnica);
export const GetAllVentanillaUnicaComboUsuario = async (id) => await getData(Url.VentanillaUnicaComboUsuario, { id });
export const NotificarUsuario = async (id, idUsuario) => await getData(Url.VentanillaUnicaNotificarUsuario, { id, idUsuario });

export const GetAllVentanillaUnicaMonitoreo = async (options) => await getData(Url.VentanillaUnicaMonitoreo, { options });
export const GetAllDocumentoVentanilla = async (documento) => await getData(Url.VentanillaUnicaDocumento, { documento });
export const InsertVentanillaUnica = async (ventanillaUnica) => await postData(Url.VentanillaUnica, ventanillaUnica);
export const UpdateVentanillaUnicas = async (ventanillaUnica) => await putData(Url.VentanillaUnica, ventanillaUnica);
export const UpdateVentanillaUnicaEnvio = async (ventanillaUnica) => await putData(Url.UpdateVentanillaUnicaEnvio, ventanillaUnica);
export const UpdateVentanillaUnicaCorreo = async (ventanillaUnica) => await putData(Url.UpdateVentanillaUnicaCorreo, ventanillaUnica);
export const DeleteVentanillaUnica = async (idVentanillaUnica) => await deleteData(Url.VentanillaUnica, { idVentanillaUnica });

export const GetAllVentanillaUnicaDetalleArea = async (idUsuario, options) => await getData(Url.VentanillaUnicaDetalleArea, { idUsuario, options });
export const GetVentanillaUnicaDetalleArchivo = async (id) => await getData(Url.VentanillaUnicaDetalleArchivo, { id });
export const GetByIdVentanillaUnicaDetalle = async (id) => await getData(Url.VentanillaUnicaDetalleId, { id });
export const GetAllVentanillaUnicaDetalle = async (idVentanilla, idArea, options) => await getData(Url.VentanillaUnicaDetalleList, { idVentanilla, idArea, options });
export const InsertVentanillaUnicaDetalle = async (ventanillaUnicaDetalle) => await postData(Url.VentanillaUnicaDetalle, ventanillaUnicaDetalle);
export const UpdateVentanillaUnicaDetalle = async (ventanillaUnicaDetalle) => await putData(Url.VentanillaUnicaDetalle, ventanillaUnicaDetalle);
export const DeleteVentanillaUnicaDetalle = async (idVentanillaUnicaDetalle) => await deleteData(Url.VentanillaUnicaDetalle, { idVentanillaUnicaDetalle });

export const GetAllByIdArchivoVentanillaUD = async (idDetalle) => await getData(Url.VentanillaUnicaDetalleArchivoAll, { idDetalle });
export const GetByIdArchivoVentanillaUD = async (idArchivo) => await getData(Url.VentanillaUnicaDetalleArchivoById, { idArchivo });
export const InsertArchivoVentanillaUD = async (archivo) => await postData(Url.VentanillaUnicaDetalleArchivo, archivo);
export const DeleteArchivoVentanillaUD = async (id) => await deleteData(Url.VentanillaUnicaDetalleArchivo, { id });