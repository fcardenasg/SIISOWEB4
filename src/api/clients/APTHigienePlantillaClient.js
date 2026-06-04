import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData } from '../UtilInstance';

// --- APTHP (Padre) ---
export const GetAPTHPById = async (id, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/id/${tipoLogica}`, { id });
export const GetAllAPTHP = async (tipoLogica) => await getData(`${Url.APTHigienePlantilla}/${tipoLogica}`);
export const SaveAPTHP = async (plantilla, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/${tipoLogica}`, plantilla);
export const DeleteAPTHP = async (idAPTHigienePlantilla, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/${tipoLogica}`, { idAPTHigienePlantilla });
export const InsertAPTHPBulk = async (idAPT, documento) => await getData(`${Url.APTHigienePlantilla}/APTH`, { idAPT, documento });

// --- APTHP Actividad ---
export const GetAllAPTHPActivity = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPActividad/${tipoLogica}`, { idAPT });
export const SaveAPTHPActivity = async (obj, tipoLogica, headersVali) => await postData(`${Url.APTHigienePlantilla}/APTHPActividad/${tipoLogica}`, obj, headersVali);
export const DeleteAPTHPActivity = async (id, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/APTHPActividad/${tipoLogica}`, { id });
export const ActivityRecordsExist = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPActividad/Exist/${tipoLogica}`, { idAPT });

// --- APTHP Factor Organizacional ---
export const GetAllAPTHPOrganizationalFactor = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional/${tipoLogica}`, { idAPT });
export const SaveAPTHPOrganizationalFactor = async (obj, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional/${tipoLogica}`, obj);
export const DeleteAPTHPOrganizationalFactor = async (id, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/APTHPFactorOrganizacional/${tipoLogica}`, { id });

// --- APTHP Metodo Control ---
export const GetAllAPTHPMetodoControl = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPMetodoControl/${tipoLogica}`, { idAPT });
export const GetAllComboAPTHPMetodoControl = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHPMetodoControl/Combo`, { idAPT });
export const SaveAPTHPMetodoControl = async (obj, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/APTHPMetodoControl/${tipoLogica}`, obj);
export const DeleteAPTHPMetodoControl = async (id, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/APTHPMetodoControl/${tipoLogica}`, { id });

// --- APTHP Valor Refe Segmento ---
export const GetAllAPTHPValorRefeSegmento = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento/${tipoLogica}`, { idAPT });
export const SaveAPTHPValorRefeSegmento = async (obj, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento/${tipoLogica}`, obj);
export const DeleteAPTHPValorRefeSegmento = async (id, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento/${tipoLogica}`, { id });
export const ValorRefeSegmentoRecordsExist = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPValorRefeSegmento/Exist/${tipoLogica}`, { idAPT });

// --- APTHP Image ---
export const GetAllAPTHPImage = async (idAPT, idItemAcordeon, idSegundarioModulo, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPImagen/${tipoLogica}`, { idAPT, idItemAcordeon, idSegundarioModulo });
export const SaveAPTHPImage = async (obj, tipoLogica, headersVali) => await postData(`${Url.APTHigienePlantilla}/APTHPImagen/${tipoLogica}`, obj, headersVali);
export const DeleteAPTHPImage = async (id, tipoLogica) => await deleteData(`${Url.APTHigienePlantilla}/APTHPImagen/${tipoLogica}`, { id });

// --- APTHP Metodo OWAS ---
export const GetAllAPTHPMetodoOWAS = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPMetodoOWAS/${tipoLogica}`, { idAPT });
export const SaveAPTHPMetodoOWAS = async (obj, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/APTHPMetodoOWAS/${tipoLogica}`, obj);

// --- APTHP Valoracion ---
export const GetAllAPTHPValoracion = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPValoracion/${tipoLogica}`, { idAPT });
export const GetDataTableAPTHPValoracion = async (idAPT, tipoLogica) => await getData(`${Url.APTHigienePlantilla}/APTHPValoracion-TableData/${tipoLogica}`, { idAPT });
export const SaveAPTHPValoracion = async (obj, tipoLogica) => await postData(`${Url.APTHigienePlantilla}/APTHPValoracion/${tipoLogica}`, obj);

/* --- APTHP Firma --- */
export const GetAllAPTHFirma = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/APTHFirma`, { idAPT });
export const SaveAPTHFirma = async (obj) => await postData(`${Url.APTHigienePlantilla}/APTHFirma`, obj);
export const DeleteAPTHFirma = async (id) => await deleteData(`${Url.APTHigienePlantilla}/APTHFirma`, { id });

/* Aprobar */
export const GetApproveAPTHygiene = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/Aprobar/Lista`, { idAPT });
export const ApproveAPTHygiene = async (idAPT) => await getData(`${Url.APTHigienePlantilla}/Aprobar`, { idAPT });