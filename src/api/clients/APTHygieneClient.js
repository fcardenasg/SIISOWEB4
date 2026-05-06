import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData } from '../UtilInstance';

// --- APTHygiene (Padre) ---
export const GetAPTHygieneById = async (id) => await getData(`${Url.APTHigiene}/id`, { id });
export const GetAllAPTHygiene = async () => await getData(Url.APTHigiene);
export const SaveAPTHygiene = async (plantilla) => await postData(Url.APTHigiene, plantilla);
export const DeleteAPTHygiene = async (idAPTHigiene) => await deleteData(Url.APTHigiene, { idAPTHigiene });

// --- APTHygiene Actividad ---
export const GetAllAPTHygieneActivity = async (idAPT) => await getData(`${Url.APTHigiene}/APTHigieneActividad`, { idAPT });
export const SaveAPTHygieneActivity = async (obj) => await postData(`${Url.APTHigiene}/APTHigieneActividad`, obj);
export const DeleteAPTHygieneActivity = async (id) => await deleteData(`${Url.APTHigiene}/APTHigieneActividad`, { id });

// --- APTHygiene Factor Organizacional ---
export const GetAllAPTHygieneOrganizationalFactor = async (idAPT) => await getData(`${Url.APTHigiene}/APTHigieneFactorOrganizacional`, { idAPT });
export const SaveAPTHygieneOrganizationalFactor = async (obj) => await postData(`${Url.APTHigiene}/APTHigieneFactorOrganizacional`, obj);
export const DeleteAPTHygieneOrganizationalFactor = async (id) => await deleteData(`${Url.APTHigiene}/APTHigieneFactorOrganizacional`, { id });

// --- APTHygiene Metodo Control ---
export const GetAllAPTHygieneMetodoControl = async (idAPT) => await getData(`${Url.APTHigiene}/APTHigieneMetodoControl`, { idAPT });
export const SaveAPTHygieneMetodoControl = async (obj) => await postData(`${Url.APTHigiene}/APTHigieneMetodoControl`, obj);
export const DeleteAPTHygieneMetodoControl = async (id) => await deleteData(`${Url.APTHigiene}/APTHigieneMetodoControl`, { id });

// --- APTHygiene Valor Refe Segmento ---
export const GetAllAPTHygieneValorRefeSegmento = async (idAPT) => await getData(`${Url.APTHigiene}/APTHigieneValorRefeSegmento`, { idAPT });
export const SaveAPTHygieneValorRefeSegmento = async (obj) => await postData(`${Url.APTHigiene}/APTHigieneValorRefeSegmento`, obj);
export const DeleteAPTHygieneValorRefeSegmento = async (id) => await deleteData(`${Url.APTHigiene}/APTHigieneValorRefeSegmento`, { id });

// --- APTHygiene Image ---
export const GetAllAPTHygieneImage = async (idAPT, idItemAcordeon, idSegundarioModulo) => await getData(`${Url.APTHigiene}/APTHigieneImagen`, { idAPT, idItemAcordeon, idSegundarioModulo });
export const SaveAPTHygieneImage = async (obj, headersVali) => await postData(`${Url.APTHigiene}/APTHigieneImagen`, obj, headersVali);
export const DeleteAPTHygieneImage = async (id) => await deleteData(`${Url.APTHigiene}/APTHigieneImagen`, { id });

// --- APTHygiene Metodo OWAS ---
export const GetAllAPTHygieneMetodoOWAS = async (idAPT) => await getData(`${Url.APTHigiene}/APTHigieneMetodoOWAS`, { idAPT });
export const SaveAPTHygieneMetodoOWAS = async (obj) => await postData(`${Url.APTHigiene}/APTHigieneMetodoOWAS`, obj);