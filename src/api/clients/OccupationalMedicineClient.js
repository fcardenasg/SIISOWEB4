import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllOccupationalMedicine = async () => await getData(Url.MedicinaLaboral);
export const GetByIdOccupationalMedicine = async (id) => await getData(Url.MedicinaLaboralId, { id });

export const GetExcelOccupationalMedicine = async (parametroExcel) => await postData(Url.MedicinaLaboralExcel, parametroExcel);

export const InsertOccupationalMedicine = async (medicinaLaboralX) => await postData(Url.MedicinaLaboral, medicinaLaboralX);
export const UpdateOccupationalMedicines = async (medicinaLaboralX) => await putData(Url.MedicinaLaboral, medicinaLaboralX);
export const DeleteOccupationalMedicine = async (idMedicinaLaboralX) => await deleteData(Url.MedicinaLaboral, { idMedicinaLaboralX });