import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOccupationalExamination = async (page, pageSize) => await getData(Url.HistoriaClinicaOcupacional, { page, pageSize });
export const GetAllByDocumento = async (page, pageSize, documento) => await getData(Url.HCOGetAllByDocumento, { page, pageSize, documento });
export const GetByIdOccupationalExamination = async (id) => await getData(Url.HistoriaClinicaOcupacionalId, { id });
export const InsertOccupationalExamination = async (historiaClinicaOcupacional) => await postData(Url.HistoriaClinicaOcupacional, historiaClinicaOcupacional);
export const UpdateOccupationalExaminations = async (historiaClinicaOcupacional) => await putData(Url.HistoriaClinicaOcupacional, historiaClinicaOcupacional);
export const DeleteOccupationalExamination = async (idHistoriaClinicaOcupacional) => await deleteData(Url.HistoriaClinicaOcupacional, { idHistoriaClinicaOcupacional });