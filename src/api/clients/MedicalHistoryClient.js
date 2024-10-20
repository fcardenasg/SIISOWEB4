import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicalHistory = async () => await getData(Url.HistoriaClinica);
export const GetByIdMedicalHistory = async (id) => await getData(Url.HistoriaClinicaId, { id });
export const GetAntecedente = async (documento) => await getData(Url.HistoriaClinicaAntecendete, { documento });
export const InsertMedicalHistory = async (historiaClinica) => await postData(Url.HistoriaClinica, historiaClinica);
export const UpdateMedicalHistorys = async (historiaClinica) => await putData(Url.HistoriaClinica, historiaClinica);
export const DeleteMedicalHistory = async (idHistoriaClinica) => await deleteData(Url.HistoriaClinica, { idHistoriaClinica });

export const GetExcelMedicalHistory = async (paraclinicos) => await postData(Url.HistoriaClinicaExcel, paraclinicos);

export const ValidateIdRegistroAtencionMedicalHistory = async (idRegistroAtencion) => await getData(Url.HistoriaClinica_ValidateIdRegistroAtencion, { idRegistroAtencion });
export const GetIdRegistroAtencionMedicalHistory = async (idRegistroAtencion) => await getData(Url.HistoriaClinica_GetIdRegistroAtencion, { idRegistroAtencion });