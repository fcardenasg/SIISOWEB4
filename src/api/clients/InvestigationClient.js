import { Url } from '../instances/AuthRoute';
import { getData, postData, deleteData } from '../UtilInstance';

export const GetAllInvestigation = async () => await getData(Url.Investigacion);
export const GetByIdInvestigation = async (id) => await getData(Url.InvestigacionId, { id });
export const InsertInvestigation = async (investigation) => await postData(Url.Investigacion, investigation);
export const GetExcelInvestigation = async (parametro) => await postData(`${Url.Investigacion}/excel`, parametro);

/* Comentario */
export const GetByIdIELComentario = async (idInvestigacion) => await getData(`${Url.Investigacion}/comentario`, { idInvestigacion });
export const InsertIELComentario = async (comentario) => await postData(`${Url.Investigacion}/comentario`, comentario);

/* Insert de detalles */
export const InsertIELMetodoControl = async (data) => await postData(`${Url.Investigacion}/metodo-control`, data);
export const InsertIELCaracterizacionAusentismo = async (data) => await postData(`${Url.Investigacion}/caracterizacion-ausentismo`, data);
export const InsertIELFirma = async (data) => await postData(`${Url.Investigacion}/iel-firma`, data);

/* Delete de detalles */
export const DeleteIELMetodoControl = async (id) => await deleteData(`${Url.Investigacion}/metodo-control`, { id });
export const DeleteIELCaracterizacionAusentismo = async (id) => await deleteData(`${Url.Investigacion}/caracterizacion-ausentismo`, { id });

/* Get de detalles */
export const GetIELMetodoControl = async (idInvestigacion) => await getData(`${Url.Investigacion}/metodo-control`, { idInvestigacion });
export const GetIELCaracterizacionAusentismo = async (idInvestigacion) => await getData(`${Url.Investigacion}/caracterizacion-ausentismo`, { idInvestigacion });

/* Get de Historias laborales */
export const GetIELHistoriaLaboralDLTD = async (documento, isUpdate) => await getData(`${Url.Investigacion}/hl-dltd`, { documento, isUpdate });
export const GetIELHistoriaLaboralOtrosEmpresas = async (documento, isUpdate) => await getData(`${Url.Investigacion}/hl-otrasemp`, { documento, isUpdate });
/* Insert de Historias laborales */
export const InsertIELHistoriaLaboralDLTD = async (data) => await postData(`${Url.Investigacion}/hl-dltd`, data);
export const InsertIELHistoriaLaboralOE = async (data) => await postData(`${Url.Investigacion}/hl-otrasemp`, data);

export const GetIELCalificacion = async (idInvestigacion) => await getData(`${Url.Investigacion}/iel-calificacion`, { idInvestigacion });
export const GetIELFirma = async (idInvestigacion) => await getData(`${Url.Investigacion}/iel-firma`, { idInvestigacion });
export const GetIELAccionPreventivaCorrectiva = async (idInvestigacion) => await getData(`${Url.Investigacion}/iel-accion-preventiva-correctiva`, { idInvestigacion });