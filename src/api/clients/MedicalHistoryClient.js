import { Url } from '../instances/AuthRoute';
import { getData, postData } from '../UtilInstance';

export const GetAllMedicalHistory = async () => await getData(Url.HistoriaClinica);
export const GetByIdMedicalHistory = async (id) => await getData(Url.HistoriaClinicaId, { id });
export const GetAntecedente = async (documento) => await getData(Url.HistoriaClinicaAntecendete, { documento });
export const GetAntecedenteEMO = async (documento) => await getData(`${Url.HistoriaClinica}/antecedente-emo`, { documento });
export const InsertMedicalHistory = async (historiaClinica) => await postData(Url.HistoriaClinica, historiaClinica);
export const GetExcelMedicalHistory = async (paraclinicos) => await postData(Url.HistoriaClinicaExcel, paraclinicos);

export const ValidateIdRegistroAtencionMedicalHistory = async (idRegistroAtencion) => await getData(Url.HistoriaClinica_ValidateIdRegistroAtencion, { idRegistroAtencion });
export const GetIdRegistroAtencionMedicalHistory = async (idRegistroAtencion) => await getData(Url.HistoriaClinica_GetIdRegistroAtencion, { idRegistroAtencion });