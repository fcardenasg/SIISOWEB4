import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllMedicalFormula = async (page, pageSize) => await getData(Url.Recetario, { page, pageSize });
export const GetByIdMedicalFormula = async (id) => await getData(Url.RecetarioId, { id });
export const InsertMedicalFormula = async (recetario) => await postData(Url.Recetario, recetario);
export const UpdateMedicalFormulas = async (recetario) => await putData(Url.Recetario, recetario);
export const DeleteMedicalFormula = async (idRecetario) => await deleteData(Url.Recetario, { idRecetario });