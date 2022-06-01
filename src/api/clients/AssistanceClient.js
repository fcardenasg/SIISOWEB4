import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAssistance = async (page, pageSize) => await getData(Url.RegistroAtencion, { page, pageSize });
export const GetByIdAssistance = async (id) => await getData(Url.RegistroAtencionId, { id });
export const InsertAssistance = async (registroAtencion) => await postData(Url.RegistroAtencion, registroAtencion);
export const UpdateAssistances = async (registroAtencion) => await putData(Url.RegistroAtencion, registroAtencion);
export const DeleteAssistance = async (idRegistroAtencion) => await deleteData(Url.RegistroAtencion, { idRegistroAtencion });