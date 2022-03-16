import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllQuestionnaire = async (page, pageSize) => await getData(Url.Cuestionario, { page, pageSize });
export const GetByIdQuestionnaire = async (id) => await getData(Url.CuestionarioId, { id });
export const InsertQuestionnaire = async (cuestionario) => await postData(Url.Cuestionario, cuestionario);
export const UpdateQuestionnaires = async (cuestionario) => await putData(Url.Cuestionario, cuestionario);
export const DeleteQuestionnaire = async (idCuestionarioPrevencion) => await deleteData(Url.Cuestionario, { idCuestionarioPrevencion });