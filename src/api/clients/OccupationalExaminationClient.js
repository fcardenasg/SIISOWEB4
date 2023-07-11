import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOccupationalExamination = async (page, pageSize) => await getData(Url.HistoriaClinicaOcupacional, { page, pageSize });
export const GetAllByDocumento = async (page, pageSize, documento) => await getData(Url.HCOGetAllByDocumento, { page, pageSize, documento });
export const GetByIdOccupationalExamination = async (id) => await getData(Url.HistoriaClinicaOcupacionalId, { id });
export const GetByIdDataReport = async (idHCO) => await getData(Url.HistoriaClinicaOcupacionalReport, { idHCO });
export const GetLastRecordOccupationalExamination = async (documento) => await getData(Url.GetLastRecordHisCliOcu, { documento });
export const InsertOccupationalExamination = async (historiaClinicaOcupacional) => await postData(Url.HistoriaClinicaOcupacional, historiaClinicaOcupacional);
export const UpdateOccupationalExaminations = async (historiaClinicaOcupacional) => await putData(Url.HistoriaClinicaOcupacional, historiaClinicaOcupacional);
export const DeleteOccupationalExamination = async (idHistoriaClinicaOcupacional) => await deleteData(Url.HistoriaClinicaOcupacional, { idHistoriaClinicaOcupacional });

export const ValidateIdRegistroAtencion = async (idRegistroAtencion) => await getData(Url.HistoriaClinicaOcupacional_ValidateIdRegistroAtencion, { idRegistroAtencion });

export const GetExcelOccupationalExamination = async (parametroExcel) => await postData(Url.HistoriaClinicaOcupacionalExcel, parametroExcel);
export const GetLastRegister = async (documento) => await getData(Url.GetLastRegister, { documento });