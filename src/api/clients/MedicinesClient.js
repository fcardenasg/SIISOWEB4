import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicines = async () => await getData(Url.Medicamentos);
export const GetByIdMedicines = async (id) => await getData(Url.MedicamentosId, { id });
export const InsertMedicines = async (medicines) => await postData(Url.Medicamentos, medicines);
export const UpdateMediciness = async (medicines) => await putData(Url.Medicamentos, medicines);
export const DeleteMedicines = async (idMedicines) => await deleteData(Url.Medicamentos, { idMedicines });

