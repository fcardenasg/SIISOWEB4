import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOccupationalMedicine = async (page, pageSize) => await getData(Url.MedicinaLaboral, { page, pageSize });
export const GetByIdOccupationalMedicine = async (id) => await getData(Url.MedicinaLaboralId, { id });
export const InsertOccupationalMedicine = async (medicinaLaboralX) => await postData(Url.MedicinaLaboral, medicinaLaboralX);
export const UpdateOccupationalMedicines = async (medicinaLaboralX) => await putData(Url.MedicinaLaboral, medicinaLaboralX);
export const DeleteOccupationalMedicine = async (idMedicinaLaboralX) => await deleteData(Url.MedicinaLaboral, { idMedicinaLaboralX });