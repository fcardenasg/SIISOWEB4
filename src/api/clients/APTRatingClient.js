import { Url } from '../instances/AuthRoute';
import {
    getData,
    deleteData,
    postData,
    putData
} from '../UtilInstance';

export const GetAllAPTCalificacion = async () => await getData(Url.APTCalificacion);
export const GetByIdAPTCalificacion = async (id) => await getData(`${Url.APTCalificacion}/id`, { id });
export const SaveAPTCalificacion = async (apt) => await postData(Url.APTCalificacion, apt);

export const UpdateAPTCalificacion = async (apt) => await putData(Url.APTCalificacion, apt);
export const DeleteAPTCalificacion = async (id) => await deleteData(Url.APTCalificacion, { id });

export const GetAllFuentesAPT = async (idAPT) => await getData(`${Url.APTCalificacion}/fuentes`, { idAPT });
export const SaveFuenteAPT = async (detalleFuente) => await postData(`${Url.APTCalificacion}/fuentes`, detalleFuente);
export const DeleteFuenteAPT = async (id) => await deleteData(`${Url.APTCalificacion}/fuentes`, { id });

export const GetAllAgentesAPT = async (idAPT) => await getData(`${Url.APTCalificacion}/agentes`, { idAPT });
export const GetFactoresAgentesAPT = async (idAPT, tipo) => await getData(`${Url.APTCalificacion}/factores-agentes`, { idAPT, tipo });
export const SaveAgenteAPT = async (detalleAgente) => await postData(`${Url.APTCalificacion}/agentes`, detalleAgente);

export const GetDataAgenteRiesgo = async () => await getData(`${Url.APTCalificacion}/agentes-riesgo`);
export const ComboEvaluador = async () => await getData(`${Url.APTCalificacion}/combo-evaluador`);