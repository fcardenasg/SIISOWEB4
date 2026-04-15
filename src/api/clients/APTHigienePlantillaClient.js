import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData } from '../UtilInstance';

// --- APTHP (Padre) ---
export const GetAPTHPById = async (id) => await getData(`${Url.APTHigienePlantilla}/id`, { id });
export const GetAllAPTHP = async () => await getData(Url.APTHigienePlantilla);
export const SaveAPTHP = async (plantilla) => await postData(Url.APTHigienePlantilla, plantilla);
export const DeleteAPTHP = async (idAPTHigienePlantilla) => await deleteData(Url.APTHigienePlantilla, { idAPTHigienePlantilla });

// --- APTHP Actividad ---
export const GetAllAPTHPActivity = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPActividad`, { idAPT });
export const SaveAPTHPActivity = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHPActividad`, obj);
export const DeleteAPTHPActivity = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPActividad`, { id });

// --- APTHP Categoria Segmento ---
export const GetAllAPTHPCategorySegment = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPCategoriaSegmento`, { idAPT });
export const SaveAPTHPCategorySegment = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHPCategoriaSegmento`, obj);
export const DeleteAPTHPCategorySegment = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPCategoriaSegmento`, { id });

// --- APTHP Factor Organizacional ---
export const GetAllAPTHPOrganizationalFactor = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional`, { idAPT });
export const SaveAPTHPOrganizationalFactor = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional`, obj);
export const DeleteAPTHPOrganizationalFactor = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional`, { id });

// --- APTHP Metodo Control ---
export const GetAllAPTHPMetodoControl = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPMetodoControl`, { idAPT });
export const SaveAPTHPMetodoControl = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHPMetodoControl`, obj);
export const DeleteAPTHPMetodoControl = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPMetodoControl`, { id });

// --- APTHP Valor Refe Segmento ---
export const GetAllAPTHPValorRefeSegmento = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento`, { idAPT });
export const SaveAPTHPValorRefeSegmento = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento`, obj);
export const DeleteAPTHPValorRefeSegmento = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento`, { id });

// --- APTHP Image ---
export const GetAllAPTHPImage = async (idAPT, idItemAcordeon, idSegundarioModulo) => await getData(`${Url.APTHigienePlantilla}/APTHPImagen`, { idAPT, idItemAcordeon, idSegundarioModulo });
export const SaveAPTHPImage = async (obj, headersVali) => await postData(`${Url.APTHigienePlantilla}/APTHPImagen`, obj, headersVali);
export const DeleteAPTHPImage = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHPImagen`, { id });