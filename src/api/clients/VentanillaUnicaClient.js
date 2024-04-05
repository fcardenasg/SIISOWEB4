import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetByIdVentanillaUnica = async (id) => await getData(Url.VentanillaUnicaId, { id });
export const GetAllVentanillaUnica = async () => await getData(Url.VentanillaUnica);
export const InsertVentanillaUnica = async (ventanillaUnica) => await postData(Url.VentanillaUnica, ventanillaUnica);
export const UpdateVentanillaUnicas = async (ventanillaUnica) => await putData(Url.VentanillaUnica, ventanillaUnica);
export const DeleteVentanillaUnica = async (idVentanillaUnica) => await deleteData(Url.VentanillaUnica, { idVentanillaUnica });

export const GetByIdVentanillaUnicaDetalle = async (idVentanillaUnica) => await getData(Url.VentanillaUnicaDetalle, { idVentanillaUnica });
export const InsertVentanillaUnicaDetalle = async (ventanillaUnicaDetalle) => await postData(Url.VentanillaUnicaDetalle, ventanillaUnicaDetalle);
export const DeleteVentanillaUnicaDetalle = async (idVentanillaUnicaDetalle) => await deleteData(Url.VentanillaUnicaDetalle, { idVentanillaUnicaDetalle });