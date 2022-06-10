import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAttention = async (page, pageSize) => await getData(Url.RegistroAtencion, { page, pageSize });
export const GetByIdAttention = async (id) => await getData(Url.RegistroAtencionId, { id });
export const InsertAttention = async (registroAtencion) => await postData(Url.RegistroAtencion, registroAtencion);
export const UpdateAttentions = async (registroAtencion) => await putData(Url.RegistroAtencion, registroAtencion);
export const DeleteAttention = async (idRegistroAtencion) => await deleteData(Url.RegistroAtencion, { idRegistroAtencion });