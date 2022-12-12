import { Url } from '../instances/AuthRoute';
import { getData, deleteData, postData, putData } from '../UtilInstance';

export const GetAllAttention = async () => await getData(Url.RegistroAtencion);
export const GetAllAtencion = async (page, pageSize, atencion) => await getData(Url.RegistroAtencio_GetAllAtencion, { page, pageSize, atencion });
export const GetByIdAttention = async (id) => await getData(Url.RegistroAtencionId, { id });
export const InsertAttention = async (registroAtencion) => await postData(Url.RegistroAtencion, registroAtencion);
export const UpdateAttentions = async (registroAtencion) => await putData(Url.RegistroAtencion, registroAtencion);
export const DeleteAttention = async (id) => await deleteData(Url.RegistroAtencion, { id });